import {Component, Inject, inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HallCardComponent} from "../hall-tabs/hall-card/hall-card.component";
import {Hall} from "../../../../share/models/hall";

@Component({
    selector: 'app-hall-card-dialog',
    imports: [
        HallCardComponent
    ],
    templateUrl: './hall-card-dialog.component.html',
    styleUrl: './hall-card-dialog.component.scss'
})
export class HallCardDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public hall: Hall) {
    this.hall = new Hall(hall);
  }


}
