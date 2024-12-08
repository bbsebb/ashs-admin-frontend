import {Component, inject, input, output} from '@angular/core';
import {Coach} from "../../../../../share/models/coach";
import {PaginatedResource} from "../../../../../share/models/hal-forms/paginated-resource";
import {CoachCardComponent} from "../coach-card/coach-card.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ConfirmDialogComponent} from "../../../../../share/components/dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-view-coachs',
  standalone: true,
  imports: [
    CoachCardComponent,
    MatPaginator
  ],
  templateUrl: './view-coaches.component.html',
  styleUrl: './view-coaches.component.scss'
})
export class ViewCoachesComponent {
  dialog:MatDialog = inject(MatDialog);
  deleteCoachEvent = output<Coach>();
  updateCoachEvent = output<Coach>();
  handlePageEvent = output<PageEvent>();

  _paginatedResourceCoaches= input.required<PaginatedResource<Coach>>({alias: 'paginatedResourceCoaches'});


  onHandlePageEvent($event: PageEvent) {
    this.handlePageEvent.emit($event);
  }

  onDeleteCoachEvent(coach: Coach) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Voulez-vous vraiment supprimer ce créneau ?',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteCoachEvent.emit(coach);
      }
    });
  }

  onModifyCoachEvent(coach: Coach) {
    this.updateCoachEvent.emit(coach);
  }
}
