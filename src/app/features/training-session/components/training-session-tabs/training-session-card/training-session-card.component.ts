import {Component, inject, input, InputSignal, OnInit, output} from '@angular/core';

import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader, MatCardModule,
  MatCardTitle
} from "@angular/material/card";
import {TrainingSession} from "../../../../../share/models/training-session";
import {MatIcon} from "@angular/material/icon";
import {DurationPipe} from "../../../../../share/pipe/duration.pipe";
import {DayOfWeekPipe} from "../../../../../share/pipe/day-of-week.pipe";
import {TimePipe} from "../../../../../share/pipe/time.pipe";
import {MatDivider} from "@angular/material/divider";
import {MatDialog} from "@angular/material/dialog";
import {HallCardComponent} from "../../../../halls/components/hall-tabs/hall-card/hall-card.component";
import {HallCardDialogComponent} from "../../../../halls/components/hall-card-dialog/hall-card-dialog.component";


@Component({
  selector: 'app-training-session-card',
  standalone: true,
  imports: [
    MatButton,
    MatCardModule,
    MatCardActions,
    MatCardAvatar,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatIcon,
    DurationPipe,
    DayOfWeekPipe,
    TimePipe,
    MatDivider,
    HallCardComponent
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
    this.deleteTrainingSession.emit(this.trainingSessionInputSignal());
  }

  openHallDialog() {
    this.dialog.open(HallCardDialogComponent, {
      data: this.trainingSessionInputSignal().hall, // On passe le hall à la modale
      width: '600px', // Ajuste la largeur selon tes besoins
    });
  }

}
