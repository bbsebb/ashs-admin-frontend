import {Component, input, InputSignal, output} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar, MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {Hall} from "../../../../../share/models/hall";
import {GoogleMapsModule} from "@angular/google-maps";
import { GoogleMap } from '@angular/google-maps';


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
export class HallCardComponent {
  hallSignal: InputSignal<Hall> = input.required<Hall>({alias: 'hall'});
  deleteHall= output<Hall>({alias: 'deleteHall'});
  modifyHall= output<Hall>({alias: 'modifyHall'});


  onModify() {
    this.modifyHall.emit(this.hallSignal());
  }

  onDelete() {
    this.deleteHall.emit(this.hallSignal());
  }

}
