import {Component, input, InputSignal, output} from '@angular/core';
import {Team} from "../../../../../share/models/team";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardAvatar, MatCardHeader, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardHeader,
    MatCardTitle
  ],
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.scss'
})
export class TeamCardComponent {
  _team: InputSignal<Team> = input.required<Team>({alias: 'team'});
  deleteTeam= output<Team>({alias: 'deleteTeam'});
  modifyTeam= output<Team>({alias: 'modifyTeam'});


  onModify() {
    this.modifyTeam.emit(this._team());
  }

  onDelete() {
    this.deleteTeam.emit(this._team());
  }

}
