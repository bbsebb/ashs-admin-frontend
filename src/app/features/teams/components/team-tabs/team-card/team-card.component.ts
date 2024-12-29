import {Component, inject, input, InputSignal, output} from '@angular/core';
import {Team} from "../../../../../share/models/team";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {DayOfWeekPipe} from "../../../../../share/pipes/day-of-week.pipe";
import {CategoryPipe} from "../../../../../share/pipes/category.pipe";
import {GenderPipe} from "../../../../../share/pipes/gender.pipe";
import {TimePipe} from "../../../../../share/pipes/time.pipe";
import {MatIcon} from "@angular/material/icon";
import {HallCardDialogComponent} from "../../../../halls/components/hall-card-dialog/hall-card-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Hall} from "../../../../../share/models/hall";
import {ConfirmDialogComponent} from "../../../../../share/components/dialog/confirm-dialog.component";

@Component({
    selector: 'app-team-card',
    imports: [
        MatButton,
        MatCard,
        MatCardActions,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        DayOfWeekPipe,
        CategoryPipe,
        GenderPipe,
        TimePipe,
        MatIcon
    ],
    templateUrl: './team-card.component.html',
    styleUrl: './team-card.component.scss'
})
export class TeamCardComponent {
  dialog:MatDialog = inject(MatDialog);
  team: InputSignal<Team> = input.required<Team>({alias: 'team'});
  deleteTeam= output<Team>({alias: 'deleteTeam'});
  modifyTeam= output<Team>({alias: 'modifyTeam'});


  onModify() {
    this.modifyTeam.emit(this.team());
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: 'Voulez-vous vraiment supprimer cette équipe ?',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteTeam.emit(this.team());
      }
    });
  }

  openHallDialog(hall:Hall) {
    this.dialog.open(HallCardDialogComponent, {
      data: hall, // On passe le hall à la modale
      width: '600px', // Ajuste la largeur selon tes besoins
    });
  }

}
