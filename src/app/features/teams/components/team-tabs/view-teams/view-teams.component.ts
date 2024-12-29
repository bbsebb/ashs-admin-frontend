import {Component, input, output} from '@angular/core';
import {TeamCardComponent} from "../../../../teams/components/team-tabs/team-card/team-card.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Team} from "../../../../../share/models/team";
import {PaginatedResource} from "../../../../../share/models/hal-forms/paginated-resource";

@Component({
    selector: 'app-view-teams',
    imports: [
        TeamCardComponent,
        MatPaginator
    ],
    templateUrl: './view-teams.component.html',
    styleUrl: './view-teams.component.scss'
})
export class ViewTeamsComponent {


  deleteTeamEvent = output<Team>();
  updateTeamEvent = output<Team>();
  handlePageEvent = output<PageEvent>();

  paginatedResourceTeamsSignal= input.required<PaginatedResource<Team>>({alias: 'paginatedResourceTeams'});

  constructor() {

  }

  onHandlePageEvent($event: PageEvent) {
    this.handlePageEvent.emit($event);
  }

  onDeleteTeamEvent(team: Team) {
    this.deleteTeamEvent.emit(team);
  }

  onModifyTeamEvent(team: Team) {
    this.updateTeamEvent.emit(team);
  }
}
