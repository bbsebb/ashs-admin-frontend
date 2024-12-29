import {Component, inject, OnInit, signal, viewChild, WritableSignal} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {PaginatedResource} from "../../../../share/models/hal-forms/paginated-resource";
import {PageEvent} from "@angular/material/paginator";
import {Hall} from "../../../../share/models/hall";
import {FormHallComponent} from "./form-hall/form-hall.component";
import {ViewHallsComponent} from "./view-halls/view-halls.component";
import {ActivatedRoute} from "@angular/router";
import {concatMap} from "rxjs";
import {HALL_SERVICE, IHallService} from "../../../../share/services/i-hall.service";


@Component({
    selector: 'app-hall-tabs',
    imports: [
        MatTabGroup,
        MatTab,
        FormHallComponent,
        ViewHallsComponent
    ],
    templateUrl: './hall-tabs.component.html',
    styleUrl: './hall-tabs.component.scss'
})
export class HallTabsComponent implements OnInit {
  private hallService: IHallService = inject(HALL_SERVICE);
  private route = inject(ActivatedRoute);

  hallUpdatingSignal = signal<Hall | undefined>(undefined);
  hallFormComponentSignal = viewChild(FormHallComponent);



  private _selectedTabIndex: number = 0;
  paginatedResourceSignal: WritableSignal<PaginatedResource<Hall>> = signal(new PaginatedResource<Hall>());


  ngOnInit(): void {
    this.hallService.getHalls()
      .pipe(
        concatMap(halls =>
        {
          this.paginatedResourceSignal.set(halls);
          return this.route.queryParams;
        })
      )
      .subscribe(
      (params) => {
        if (params['tab']) {
          this.selectedTabIndex = parseInt(params['tab']) || 0;
        }
      });
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
      error: (err) => this.getHalls(),
      complete: () => {
        this.hallFormComponentSignal()?.reset();
        this.selectedTabIndex = 0;
        this.hallUpdatingSignal.set(undefined);
      }
    })
  }

  onSubmitSaveHall(hall: Hall) {
    this.hallService.save(hall,this.paginatedResourceSignal().getTemplate("createHall").target).subscribe({
      next: () => this.getHalls(), //refresh
      error: (err) => this.getHalls(),
      complete: () => {
        this.hallFormComponentSignal()?.reset();
        this.selectedTabIndex = 0
      }
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
