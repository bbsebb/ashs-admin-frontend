import {Component, input, output} from '@angular/core';

import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {PaginatedResource} from "../../../../../share/models/hal-forms/paginated-resource";
import {TrainingSessionCardComponent} from "../training-session-card/training-session-card.component";
import {TrainingSession} from "../../../../../share/models/training-session";


@Component({
  selector: 'app-view-training-sessions',
  standalone: true,
  imports: [
    MatPaginator,
    TrainingSessionCardComponent
  ],
  templateUrl: './view-training-sessions.component.html',
  styleUrl: './view-training-sessions.component.scss'
})
export class ViewTrainingSessionsComponent {


  deleteTrainingSessionEvent = output<TrainingSession>();
  updateTrainingSessionEvent = output<TrainingSession>();
  handlePageEvent = output<PageEvent>();

  paginatedResourceTrainingSessionsSignal= input.required<PaginatedResource<TrainingSession>>({alias: 'paginatedResourceTrainingSessions'});

  constructor() {

  }

  onHandlePageEvent($event: PageEvent) {
    this.handlePageEvent.emit($event);
  }

  onDeleteTrainingSessionEvent(trainingSession: TrainingSession) {
    this.deleteTrainingSessionEvent.emit(trainingSession);
  }

  onModifyTrainingSessionEvent(trainingSession: TrainingSession) {
    this.updateTrainingSessionEvent.emit(trainingSession);
  }
}
