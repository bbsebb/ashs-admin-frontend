import {Component, input, InputSignal, output} from '@angular/core';

import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardAvatar, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {TrainingSession} from "../../../../../share/models/training-session";

@Component({
  selector: 'app-training-session-card',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardHeader,
    MatCardTitle
  ],
  templateUrl: './training-session-card.component.html',
  styleUrl: './training-session-card.component.scss'
})
export class TrainingSessionCardComponent {
  _trainingSession: InputSignal<TrainingSession> = input.required<TrainingSession>({alias: 'trainingSession'});
  deleteTrainingSession= output<TrainingSession>({alias: 'deleteTrainingSession'});
  modifyTrainingSession= output<TrainingSession>({alias: 'modifyTrainingSession'});


  onModify() {
    this.modifyTrainingSession.emit(this._trainingSession());
  }

  onDelete() {
    this.deleteTrainingSession.emit(this._trainingSession());
  }

}
