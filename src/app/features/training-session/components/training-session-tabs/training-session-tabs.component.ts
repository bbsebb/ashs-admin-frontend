import {Component, inject, signal, viewChild, WritableSignal} from '@angular/core';
import {PaginatedResource} from "../../../../share/models/hal-forms/paginated-resource";
import {PageEvent} from "@angular/material/paginator";
import {TrainingSession} from "../../../../share/models/training-session";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {ViewTrainingSessionsComponent} from "./view-training-sessions/view-training-sessions.component";
import {FormTrainingSessionComponent} from "./form-training-session/form-training-session.component";
import {ITrainingSessionService, TRAINING_SESSION_SERVICE} from "../../../../share/services/i-training-session.service";

@Component({
    selector: 'app-training-session-tabs',
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
  trainingSessionUpdatingSignal = signal<TrainingSession | undefined>(undefined);
  trainingSessionFormComponentSignal = viewChild(FormTrainingSessionComponent);
  trainingSessionService: ITrainingSessionService = inject(TRAINING_SESSION_SERVICE);

  private _selectedTabIndex: number = 0;
  paginatedResource: WritableSignal<PaginatedResource<TrainingSession>> = signal(new PaginatedResource<TrainingSession>());

  constructor() {
    this.getTrainingSessions();
  }


  get selectedTabIndex(): number {
    return this._selectedTabIndex;
  }

  set selectedTabIndex(index: number) {
    if (this.selectedTabIndex !== index) {
      if (this.selectedTabIndex === 2) {
        this.trainingSessionUpdatingSignal.set(undefined);
      }
      this._selectedTabIndex = index;
    }
  }

  getTrainingSessions() {
    this.trainingSessionService.getTrainingSessions(0,20,['timeSlot_dayOfWeek,asc']).subscribe(trainingSessions => {
      this.paginatedResource.set(trainingSessions);
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
      error: () => this.getTrainingSessions(),
      complete: () => {
        this.trainingSessionFormComponentSignal()?.reset();
        this.trainingSessionUpdatingSignal.set(undefined);
        this.selectedTabIndex = 0;
      }
    })
  }

  onSubmitSaveTrainingSession(trainingSession: TrainingSession) {
    this.trainingSessionService.save(trainingSession,this.paginatedResource().getTemplate("createTrainingSession").target).subscribe({
      next: () => this.getTrainingSessions(), //refresh
      error: () => this.getTrainingSessions(),
      complete: () => {
        this.trainingSessionFormComponentSignal()?.reset();
        this.selectedTabIndex = 0
      }
    });
  }

  handlePageEvent($event: PageEvent) {
    this.trainingSessionService.getTrainingSessions($event.pageIndex, $event.pageSize).subscribe(trainingSessions => {
      this.paginatedResource.set(trainingSessions);
    } );
  }

  onUpdateTrainingSessionEvent(trainingSession: TrainingSession) {
    this.selectedTabIndex = 2;
    this.trainingSessionUpdatingSignal.set(trainingSession);
  }

}
