import {ChangeDetectorRef, Component, effect, inject, signal, WritableSignal} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {ViewCoachesComponent} from "./view-coaches/view-coaches.component";
import {FormCoachComponent} from "./form-coach/form-coach.component";
import {Coach} from "../../../../share/models/coach";
import {CoachService} from "../../../../share/services/coach.service";
import {PaginatedResource} from "../../../../share/models/hal-forms/paginated-resource";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-coach-tabs',
  standalone: true,
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

  coachService: CoachService = inject(CoachService);


  coachUpdatingSignal = signal<Coach | undefined>(undefined);



  private _selectedTabIndex: number = 0;
  paginatedResourceSignal: WritableSignal<PaginatedResource<Coach>> = signal(new PaginatedResource<Coach>({_embedded: {coaches: [] as Coach[]}, page: {size:0,number:0,totalPages:0,totalElements:0}, _links: { self: { href: '' } }, _templates: {} }));

  constructor() {
    this.getCoaches();
    effect(() => {
      this.selectedTabIndex = this.coachUpdatingSignal() ? 2 : 0;
    });
  }

  // Getter pour selectedTabIndex
  get selectedTabIndex(): number {
    return this._selectedTabIndex;
  }

// Setter pour selectedTabIndex qui capture les changements
  set selectedTabIndex(index: number) {
    if (this.selectedTabIndex !== index) {
      if(this._selectedTabIndex === 2) {
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
      error: (err) => console.error('Erreur : ', err),
      complete: () => this.coachUpdatingSignal.set(undefined)
    })
  }

  onSubmitSaveCoach(coach: Coach) {
    this.coachService.save(coach,this.paginatedResourceSignal().getTemplate("createCoach").target).subscribe({
      next: (value) => this.getCoaches(), //refresh
      error: (err) => console.error('Erreur : ', err),
      complete: () => this.selectedTabIndex = 0
    });
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.coachService.getCoaches(pageEvent.pageIndex, pageEvent.pageSize).subscribe(coaches => {
      this.paginatedResourceSignal.set(coaches);
    } );
  }

  onUpdateCoachEvent($event: Coach) {
    this.coachUpdatingSignal.set($event);
  }
}
