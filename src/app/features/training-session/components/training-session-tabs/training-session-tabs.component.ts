import {Component, effect, inject, signal, WritableSignal} from '@angular/core';
import {PaginatedResource} from "../../../../share/models/hal-forms/paginated-resource";
import {PageEvent} from "@angular/material/paginator";
import {TrainingSession} from "../../../../share/models/training-session";
import {TrainingSessionService} from "../../../../share/services/training-session.service";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {ViewTrainingSessionsComponent} from "./view-training-sessions/view-training-sessions.component";
import {FormTrainingSessionComponent} from "./form-training-session/form-training-session.component";
import {ResourceService} from "../../../../share/services/resource.service";

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
  trainingSessionUpdating = signal<TrainingSession | undefined>(undefined);

  trainingSessionService: TrainingSessionService = inject(TrainingSessionService);
  resourceService = inject(ResourceService);

  private _selectedTabIndex: number = 0;
  paginatedResource: WritableSignal<PaginatedResource<TrainingSession>> = signal(new PaginatedResource<TrainingSession>({_embedded: {trainingSessions: [] as TrainingSession[]}, page: {size:0,number:0,totalPages:0,totalElements:0}, _links: { self: { href: '' } }, _templates: {} }));

  constructor() {
    this.getTrainingSessions();
  }


  get selectedTabIndex(): number {
    return this._selectedTabIndex;
  }

  set selectedTabIndex(index: number) {
    if (this.selectedTabIndex !== index) {
      if (this.selectedTabIndex === 2) {
        this.trainingSessionUpdating.set(undefined);
      }
      this._selectedTabIndex = index;
    }
  }

  getTrainingSessions() {
    this.trainingSessionService.getTrainingSessions().subscribe(trainingSessions => {
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
      error: (err) => console.error('Erreur : ', err),
      complete: () => {
        this.selectedTabIndex = 0;
        this.trainingSessionUpdating.set(undefined);
      }
    })
  }

  onSubmitSaveTrainingSession(trainingSession: TrainingSession) {
    this.trainingSessionService.save(trainingSession,this.paginatedResource().getTemplate("createTrainingSession").target).subscribe({
      next: () => this.getTrainingSessions(), //refresh
      error: (err) => console.error('Erreur : ', err),
      complete: () => this.selectedTabIndex = 0
    });
  }

  handlePageEvent($event: PageEvent) {
    this.trainingSessionService.getTrainingSessions($event.pageIndex, $event.pageSize).subscribe(trainingSessions => {
      this.paginatedResource.set(trainingSessions);
    } );
  }

  onUpdateTrainingSessionEvent(trainingSession: TrainingSession) {
    this.selectedTabIndex = 2;
    this.trainingSessionUpdating.set(trainingSession);
  }

}
