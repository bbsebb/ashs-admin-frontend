import {Component, effect, inject, signal, WritableSignal} from '@angular/core';
import {PaginatedResource} from "../../../../share/models/hal-forms/paginated-resource";
import {PageEvent} from "@angular/material/paginator";
import {TrainingSession} from "../../../../share/models/training-session";
import {TrainingSessionService} from "../../../../share/services/training-session.service";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {ViewTrainingSessionsComponent} from "./view-training-sessions/view-training-sessions.component";
import {FormTrainingSessionComponent} from "./form-training-session/form-training-session.component";

@Component({
  selector: 'app-training-session-tabs',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    ViewTrainingSessionsComponent,
    FormTrainingSessionComponent
  ],
  templateUrl: './training-session-tabs.component.html',
  styleUrl: './training-session-tabs.component.scss'
})
export class TrainingSessionTabsComponent {
  _trainingSessionUpdating = signal<TrainingSession | undefined>(undefined);

  trainingSessionService: TrainingSessionService = inject(TrainingSessionService);

  selectedTabIndex: number = 0;
  _paginatedResource: WritableSignal<PaginatedResource<TrainingSession>> = signal(new PaginatedResource<TrainingSession>({_embedded: {trainingSessions: [] as TrainingSession[]}, page: {size:0,number:0,totalPages:0,totalElements:0}, _links: { self: { href: '' } }, _templates: {} }));

  constructor() {
    this.getTrainingSessions();
    effect(() => {
      this.selectedTabIndex = this._trainingSessionUpdating() ? 2 : 0;
    });
    const jsonTrainingSession = {
      "timeSlot": {
        "dayOfWeek": "MONDAY",
        "startTime": "11:00:00",
        "endTime": "12:00:00"
      },
      "_links": {
        "self": {
          "href": "http://localhost:8084/trainingSessions/19"
        },
        "trainingSessions": {
          "href": "http://localhost:8084/trainingSessions?page=0&size=20"
        },
        "hall": {
          "href": "http://localhost:8084/halls/2"
        }
      },
      "_templates": {
        "deleteTrainingSession": {
          "method": "DELETE",
          "properties": []
        },
        "updateTrainingSession": {
          "method": "PUT",
          "properties": [
            {
              "name": "hall",
              "readOnly": true
            },
            {
              "name": "id",
              "readOnly": true,
              "type": "number"
            },
            {
              "name": "timeSlot",
              "readOnly": true
            }
          ]
        },
        "default": {
          "method": "PUT",
          "properties": [
            {
              "name": "hall",
              "readOnly": true
            },
            {
              "name": "id",
              "readOnly": true,
              "type": "number"
            },
            {
              "name": "timeSlot",
              "readOnly": true
            }
          ]
        }
      }
    };
    console.log(TrainingSession.create(jsonTrainingSession));
  }

  getTrainingSessions() {
    this.trainingSessionService.getTrainingSessions().subscribe(trainingSessions => {
      this._paginatedResource.set(trainingSessions);
    })
  }

  onDeleteTrainingSession(trainingSession: TrainingSession) {
    this.trainingSessionService.delete(trainingSession).subscribe({
      next: () => this.getTrainingSessions(), //refresh
      error: (err) => console.error('Erreur : ', err)
    });
  }

  onSubmitUpdateTrainingSession(trainingSession: TrainingSession) {
    this.trainingSessionService.update(trainingSession).subscribe({
      next: () => this.getTrainingSessions(), //refresh
      error: (err) => console.error('Erreur : ', err),
      complete: () => this._trainingSessionUpdating.set(undefined)
    })
  }

  onSubmitSaveTrainingSession(trainingSession: TrainingSession) {
    this.trainingSessionService.save(trainingSession,this._paginatedResource().getTemplate("createTrainingSession").target).subscribe({
      next: () => this.getTrainingSessions(), //refresh
      error: (err) => console.error('Erreur : ', err),
      complete: () => this.selectedTabIndex = 0
    });
  }

  handlePageEvent($event: PageEvent) {
    this.trainingSessionService.getTrainingSessions($event.pageIndex, $event.pageSize).subscribe(trainingSessions => {
      this._paginatedResource.set(trainingSessions);
    } );
  }

  onUpdateTrainingSessionEvent(trainingSession: TrainingSession) {
    this._trainingSessionUpdating.set(trainingSession);
  }

}
