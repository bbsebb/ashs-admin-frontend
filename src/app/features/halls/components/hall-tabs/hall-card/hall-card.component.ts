import {Component, inject, input, InputSignal, OnInit, output, ViewChild} from '@angular/core';
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


@Component({
  selector: 'app-hall-card',
  standalone: true,
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
export class HallCardComponent implements OnInit{
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
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



  ngOnInit(): void {
    this.mapGeocoder.geocode({address: `${this.hallSignal().address.street} ${this.hallSignal().address.postalCode} ${this.hallSignal().address.postalCode} ${this.hallSignal().address.country}`}).subscribe(
      (results: MapGeocoderResponse) => {
        if(results.results[0] && results.status === google.maps.GeocoderStatus.OK) {
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
    this.deleteHall.emit(this.hallSignal());
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
