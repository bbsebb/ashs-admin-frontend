import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  output,
} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle
} from "@angular/material/card";
import {Hall} from "../../../../../share/models/hall";
import {ConfirmDialogComponent} from "../../../../../share/components/dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NgxMapboxGLModule} from "ngx-mapbox-gl";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import mapboxgl from "mapbox-gl";
import {Address} from "../../../../../share/models/address";

@Component({
  selector: 'app-hall-card',
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    
    MatCardHeader,
    MatCardTitle,
    NgxMapboxGLModule,
  ],
  templateUrl: './hall-card.component.html',
  styleUrl: './hall-card.component.scss',
})
export class HallCardComponent {
  private static readonly MAPBOX_API_BASE_URL = 'https://api.mapbox.com/search/geocode/v6/forward';
  uniqueId: string = 'hall-card-' + Math.random().toString(36).substring(2, 11);
  dialog: MatDialog = inject(MatDialog);
  http: HttpClient = inject(HttpClient);
  hallSignal: InputSignal<Hall> = input.required<Hall>({ alias: 'hall' });
  deleteHall = output<Hall>({ alias: 'deleteHall' });
  modifyHall = output<Hall>({ alias: 'modifyHall' });

  constructor() {
    effect(() => this.initializeMap());
  }

  private initializeMap(): void {
    const hall = this.hallSignal();
    const urlApiAddress = this.buildGeocodeURL(hall.address);

    this.http.get<any>(urlApiAddress).subscribe((geocodeResponse) => {
      const coordinates = this.extractCoordinates(geocodeResponse);
      const map = this.createMap(coordinates);
      this.addMarkerWithPopup(map, coordinates, this.generatePopupHTML(hall));
    });
  }

  private buildGeocodeURL(address: Address): string {
    const { street, postalCode, city, country } = address;
    return `${HallCardComponent.MAPBOX_API_BASE_URL}?access_token=${environment.mapbox.accessToken}&street=${street}&postcode=${postalCode}&locality=${city}&country=${country}&limit=1&language=fr`;
  }

  private extractCoordinates(geocodeResponse: any): mapboxgl.LngLatLike {
    return {
      lng: geocodeResponse.features[0].geometry.coordinates[0],
      lat: geocodeResponse.features[0].geometry.coordinates[1],
    };
  }

  private createMap(coordinates: mapboxgl.LngLatLike): mapboxgl.Map {
    const map = new mapboxgl.Map({
      container: this.uniqueId,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: coordinates,
      zoom: 15,
      accessToken: environment.mapbox.accessToken,
    });
    map.addControl(new mapboxgl.NavigationControl());
    return map;
  }

  private addMarkerWithPopup(map: mapboxgl.Map, coordinates: mapboxgl.LngLatLike, popupHTML: string): void {
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML);

    new mapboxgl.Marker()
      .setLngLat(coordinates)
      .setPopup(popup)
      .addTo(map);
  }

  private generatePopupHTML(hall: Hall): string {
    const { name, address } = hall;
    return `<strong>${name}</strong><br />
            ${address.street}<br />
            ${address.postalCode} ${address.city}<br />
            ${address.country}`;
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
}
