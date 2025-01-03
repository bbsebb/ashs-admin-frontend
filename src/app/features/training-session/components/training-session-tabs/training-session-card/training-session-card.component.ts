import {Component, inject, input, InputSignal, output} from '@angular/core';

import {MatButton} from "@angular/material/button";
import {
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardModule,
  MatCardTitle
} from "@angular/material/card";
import {TrainingSession} from "../../../../../share/models/training-session";
import {MatIcon} from "@angular/material/icon";
import {DurationPipe} from "../../../../../share/pipes/duration.pipe";
import {DayOfWeekPipe} from "../../../../../share/pipes/day-of-week.pipe";
import {TimePipe} from "../../../../../share/pipes/time.pipe";
import {MatDialog} from "@angular/material/dialog";
import {HallCardDialogComponent} from "../../../../halls/components/hall-card-dialog/hall-card-dialog.component";
import {Resource} from "../../../../../share/models/hal-forms/resource";
import {ConfirmDialogComponent} from "../../../../../share/components/dialog/confirm-dialog.component";


@Component({
    selector: 'app-training-session-card',
    imports: [
        MatButton,
        MatCardModule,
        MatCardActions,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatIcon,
        DurationPipe,
        DayOfWeekPipe,
        TimePipe
    ],
    templateUrl: './training-session-card.component.html',
    styleUrl: './training-session-card.component.scss'
})
export class TrainingSessionCardComponent {
  dialog:MatDialog = inject(MatDialog);
  trainingSessionInputSignal: InputSignal<TrainingSession> = input.required<TrainingSession>({alias: 'trainingSession'});
  deleteTrainingSession= output<TrainingSession>({alias: 'deleteTrainingSession'});
  modifyTrainingSession= output<TrainingSession>({alias: 'modifyTrainingSession'});


  onModify() {
    this.modifyTrainingSession.emit(this.trainingSessionInputSignal());
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Voulez-vous vraiment supprimer ce créneau ?',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteTrainingSession.emit(this.trainingSessionInputSignal());
      }
    });

  }

  openHallDialog() {
    this.dialog.open(HallCardDialogComponent, {
      data: this.trainingSessionInputSignal().hall, // On passe le hall à la modale
      width: '600px', // Ajuste la largeur selon tes besoins
    });
  }

  protected readonly Resource = Resource;
}
