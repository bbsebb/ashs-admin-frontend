import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  OnInit,
  output,
  OutputEmitterRef,
  ViewChild
} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {Hall} from "../../../../../share/models/hall";
import {
  GoogleMap,
  GoogleMapsModule,
  MapAdvancedMarker,
  MapGeocoder,
  MapGeocoderResponse,
  MapInfoWindow
} from "@angular/google-maps";
import {ConfirmDialogComponent} from "../../../../../share/components/dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";



@Component({
    selector: 'app-hall-card',
    imports: [
        MatButton,
        MatCard,
        MatCardActions,
        MatCardAvatar,
        MatCardHeader,
        MatCardSubtitle,
        MatCardTitle,
        MatCardContent,
        GoogleMapsModule,
        GoogleMap
    ],
    templateUrl: './hall-card.component.html',
    styleUrl: './hall-card.component.scss'
})
export class HallCardComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  dialog:MatDialog = inject(MatDialog);
  mapGeocoder = inject(MapGeocoder);
  hallSignal: InputSignal<Hall> = input.required<Hall>({alias: 'hall'});
  deleteHall= output<Hall>({alias: 'deleteHall'});
  modifyHall= output<Hall>({alias: 'modifyHall'});
  gmOptions: google.maps.MapOptions = {
    streetViewControl: false,
    mapId: 'Hall map'
  };
  mapInfoOptions: google.maps.InfoWindowOptions = {

  };
  latLng: google.maps.LatLngLiteral = {lat: 0, lng: 0};


  constructor() {
    // Utiliser un effet pour surveiller les changements d'adresse
    effect(() => {
      const address = this.hallSignal().address;
      if (address) {
        const formattedAddress = `${address.street} ${address.postalCode} ${address.city} ${address.country}`;
        this.geocodeAddress(formattedAddress);
      }
    });
  }

// Fonction pour gérer le géocodage
  private geocodeAddress(address: string): void {
    this.mapGeocoder.geocode({ address }).subscribe(
      (results: MapGeocoderResponse) => {
        if (results.results[0] && results.status === google.maps.GeocoderStatus.OK) {
          this.latLng = {
            lat: results.results[0].geometry.location.lat(),
            lng: results.results[0].geometry.location.lng()
          };
        } else {
          console.error('Geocode was not successful for the following reason: ' + results.status);
        }
      }
    );
  }

  onModify() {
    this.modifyHall.emit(this.hallSignal());
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Voulez-vous vraiment supprimer ce créneau ?',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteHall.emit(this.hallSignal());
      }
    });
  }


  openInfoWindows(marker: MapAdvancedMarker) {
    if (this.infoWindow) {
      this.infoWindow.infoWindow?.setHeaderContent(this.hallSignal().name);
      this.infoWindow.open(marker);
    }
  }

  getGoogleMapsLink(lat: number, lng: number): string {
    return `https://www.google.com/maps?q=${lat},${lng}`;
  }
}
