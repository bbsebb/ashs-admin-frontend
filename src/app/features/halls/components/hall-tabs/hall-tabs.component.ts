import {Component, effect, inject, signal, WritableSignal} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {PaginatedResource} from "../../../../share/models/hal-forms/paginated-resource";
import {PageEvent} from "@angular/material/paginator";
import {HallService} from "../../../../share/services/hall.service";
import {Hall} from "../../../../share/models/hall";
import {FormHallComponent} from "./form-hall/form-hall.component";
import {ViewHallsComponent} from "./view-halls/view-halls.component";

@Component({
  selector: 'app-hall-tabs',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    FormHallComponent,
    ViewHallsComponent
  ],
  templateUrl: './hall-tabs.component.html',
  styleUrl: './hall-tabs.component.scss'
})
export class HallTabsComponent {


  hallUpdatingSignal = signal<Hall | undefined>(undefined);

  hallService: HallService = inject(HallService);

  private _selectedTabIndex: number = 0;
  paginatedResourceSignal: WritableSignal<PaginatedResource<Hall>> = signal(new PaginatedResource<Hall>({_embedded: {halls: [] as Hall[]}, page: {size:0,number:0,totalPages:0,totalElements:0}, _links: { self: { href: '' } }, _templates: {} }));

  constructor() {
    this.getHalls();
  }

// Setter pour selectedTabIndex qui capture les changements
  set selectedTabIndex(index: number) {
    if (this.selectedTabIndex !== index) {
      if (this.selectedTabIndex === 2) {
        this.hallUpdatingSignal.set(undefined);
      }
      this._selectedTabIndex = index;
    }
  }

  get selectedTabIndex(): number {
    return this._selectedTabIndex;
  }

  getHalls() {
    this.hallService.getHalls().subscribe(halls => {
      this.paginatedResourceSignal.set(halls);
    })
  }

  onDeleteHall(hall: Hall) {
    this.hallService.delete(hall).subscribe({
      next: () => this.getHalls(), //refresh
      error: (err) => console.error('Erreur : ', err)
    });
  }

  onSubmitUpdateHall(hall: Hall) {
    this.hallService.update(hall).subscribe({
      next: () => this.getHalls(), //refresh
      error: (err) => console.error('Erreur : ', err),
      complete: () => {
        this.selectedTabIndex = 0
        this.hallUpdatingSignal.set(undefined);
      }
    })
  }

  onSubmitSaveHall(hall: Hall) {
    this.hallService.save(hall,this.paginatedResourceSignal().getTemplate("createHall").target).subscribe({
      next: () => this.getHalls(), //refresh
      error: (err) => console.error('Erreur : ', err),
      complete: () => this.selectedTabIndex = 0
    });
  }

  handlePageEvent($event: PageEvent) {
    this.hallService.getHalls($event.pageIndex, $event.pageSize).subscribe(halls => {
      this.paginatedResourceSignal.set(halls);
    } );
  }

  onUpdateHallEvent(hall: Hall) {
    this.selectedTabIndex = 2;
    this.hallUpdatingSignal.set(hall);
  }

}
