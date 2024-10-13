import {Component, effect, inject, input, output, signal, WritableSignal} from '@angular/core';
import {CoachService} from "../../../../../share/services/coach.service";
import {AsyncPipe} from "@angular/common";
import {Coach} from "../../../../../share/models/coach";
import {PaginatedResource} from "../../../../../share/models/hal-forms/paginated-resource";
import {CoachCardComponent} from "../coach-card/coach-card.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-view-coachs',
  standalone: true,
  imports: [
    AsyncPipe,
    CoachCardComponent,
    MatPaginator
  ],
  templateUrl: './view-coaches.component.html',
  styleUrl: './view-coaches.component.scss'
})
export class ViewCoachesComponent {


  deleteCoachEvent = output<Coach>();
  updateCoachEvent = output<Coach>();
  handlePageEvent = output<PageEvent>();

  _paginatedResourceCoaches= input.required<PaginatedResource<Coach>>({alias: 'paginatedResourceCoaches'});

  constructor() {

  }

  onHandlePageEvent($event: PageEvent) {
    this.handlePageEvent.emit($event);
  }

  onDeleteCoachEvent(coach: Coach) {
    this.deleteCoachEvent.emit(coach);
  }

  onModifyCoachEvent(coach: Coach) {
    this.updateCoachEvent.emit(coach);
  }
}
