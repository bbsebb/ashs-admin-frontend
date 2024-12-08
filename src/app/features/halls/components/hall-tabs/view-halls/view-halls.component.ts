import {Component, input, output} from '@angular/core';
import {CoachCardComponent} from "../../../../coachs/components/coach-tabs/coach-card/coach-card.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Coach} from "../../../../../share/models/coach";
import {PaginatedResource} from "../../../../../share/models/hal-forms/paginated-resource";
import {Hall} from "../../../../../share/models/hall";
import {HallCardComponent} from "../hall-card/hall-card.component";

@Component({
  selector: 'app-view-halls',
  standalone: true,
  imports: [
    CoachCardComponent,
    MatPaginator,
    HallCardComponent
  ],
  templateUrl: './view-halls.component.html',
  styleUrl: './view-halls.component.scss'
})
export class ViewHallsComponent {


  deleteHallEvent = output<Hall>();
  updateHallEvent = output<Hall>();
  handlePageEvent = output<PageEvent>();

  paginatedResourceHallsSignal= input.required<PaginatedResource<Hall>>({alias: 'paginatedResourceHalls'});

  constructor() {

  }

  onHandlePageEvent($event: PageEvent) {
    this.handlePageEvent.emit($event);
  }

  onDeleteHallEvent(hall: Hall) {
    this.deleteHallEvent.emit(hall);
  }

  onModifyHallEvent(hall: Hall) {
    this.updateHallEvent.emit(hall);
  }
}
