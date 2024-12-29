import {Component, inject, signal, viewChild, WritableSignal} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {ViewCoachesComponent} from "./view-coaches/view-coaches.component";
import {FormCoachComponent} from "./form-coach/form-coach.component";
import {Coach} from "../../../../share/models/coach";
import {PaginatedResource} from "../../../../share/models/hal-forms/paginated-resource";
import {PageEvent} from "@angular/material/paginator";
import {COACH_SERVICE, ICoachService} from "../../../../share/services/i-coach.service";

@Component({
    selector: 'app-coach-tabs',
    imports: [
        MatTabGroup,
        MatTab,
        ViewCoachesComponent,
        FormCoachComponent
    ],
    templateUrl: './coach-tabs.component.html',
    styleUrl: './coach-tabs.component.scss'
})
export class CoachTabsComponent {


  coachService: ICoachService = inject(COACH_SERVICE);
  coachUpdatingSignal = signal<Coach | undefined>(undefined);
  coachFormComponentSignal = viewChild(FormCoachComponent);



  private _selectedTabIndex: number = 0;
  paginatedResourceSignal: WritableSignal<PaginatedResource<Coach>> = signal(new PaginatedResource<Coach>());

  constructor() {
    this.getCoaches();
  }

  // Getter pour selectedTabIndex
  get selectedTabIndex(): number {
    return this._selectedTabIndex;
  }

// Setter pour selectedTabIndex qui capture les changements
  set selectedTabIndex(index: number) {
    if (this.selectedTabIndex !== index) {
      if (this.selectedTabIndex === 2) {
        this.coachUpdatingSignal.set(undefined);
      }
      this._selectedTabIndex = index;
    }
  }

  getCoaches() {
    this.coachService.getCoaches().subscribe(coaches => {
      this.paginatedResourceSignal.set(coaches);
    })
  }

  onDeleteCoach(coach: Coach) {
    this.coachService.delete(coach).subscribe({
      next: (value) => this.getCoaches(), //refresh
      error: (err) => console.error('Erreur : ', err)
    });
  }

  onSubmitUpdateCoach(coach: Coach) {
    this.coachService.update(coach).subscribe({
      next: (value) => this.getCoaches(), //refresh
      error: (err) => this.getCoaches(),
      complete: () => {
        this.coachFormComponentSignal()?.reset()
        this.coachUpdatingSignal.set(undefined);
        this.selectedTabIndex = 0;
      }
    })
  }

  onSubmitSaveCoach(coach: Coach) {
    this.coachService.save(coach,this.paginatedResourceSignal().getTemplate("createCoach").target).subscribe({
      next: (value) => this.getCoaches(), //refresh
      error: (err) => this.getCoaches(),
      complete: () => {
        this.coachFormComponentSignal()?.reset()
        this.selectedTabIndex = 0
      }
    });
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.coachService.getCoaches(pageEvent.pageIndex, pageEvent.pageSize).subscribe(coaches => {
      this.paginatedResourceSignal.set(coaches);
    } );
  }

  onUpdateCoachEvent(coach: Coach) {
    this.selectedTabIndex = 2;
    this.coachUpdatingSignal.set(coach);
  }
}
