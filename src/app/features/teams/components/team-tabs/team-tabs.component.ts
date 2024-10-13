import {Component, effect, inject, signal, WritableSignal} from '@angular/core';
import {Team} from "../../../../share/models/team";
import {TeamService} from "../../../../share/services/team.service";
import {PaginatedResource} from "../../../../share/models/hal-forms/paginated-resource";
import {PageEvent} from "@angular/material/paginator";
import {FormHallComponent} from "../../../halls/components/hall-tabs/form-hall/form-hall.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {ViewHallsComponent} from "../../../halls/components/hall-tabs/view-halls/view-halls.component";
import {ViewTeamsComponent} from "./view-teams/view-teams.component";
import {FormTeamComponent} from "./form-team/form-team.component";

@Component({
  selector: 'app-team-tabs',
  standalone: true,
  imports: [
    FormHallComponent,
    MatTab,
    MatTabGroup,
    ViewHallsComponent,
    ViewTeamsComponent,
    FormTeamComponent
  ],
  templateUrl: './team-tabs.component.html',
  styleUrl: './team-tabs.component.scss'
})
export class TeamTabsComponent {
  _teamUpdating = signal<Team | undefined>(undefined);

  teamService: TeamService = inject(TeamService);

  selectedTabIndex: number = 0;
  _paginatedResource: WritableSignal<PaginatedResource<Team>> = signal(new PaginatedResource<Team>({_embedded: {teams: [] as Team[]}, page: {size:0,number:0,totalPages:0,totalElements:0}, _links: { self: { href: '' } }, _templates: {} }));

  constructor() {
    this.getTeams();
    effect(() => {
      this.selectedTabIndex = this._teamUpdating() ? 2 : 0;
    });
  }

  getTeams() {
    this.teamService.getTeams().subscribe(teams => {
      this._paginatedResource.set(teams);
    })
  }

  onDeleteTeam(team: Team) {
    this.teamService.delete(team).subscribe({
      next: () => this.getTeams(), //refresh
      error: (err) => console.error('Erreur : ', err)
    });
  }

  onSubmitUpdateTeam(team: Team) {
    this.teamService.update(team).subscribe({
      next: () => this.getTeams(), //refresh
      error: (err) => console.error('Erreur : ', err),
      complete: () => this._teamUpdating.set(undefined)
    })
  }

  onSubmitSaveTeam(team: Team) {
    this.teamService.save(team,this._paginatedResource().getTemplate("createTeam").target).subscribe({
      next: () => this.getTeams(), //refresh
      error: (err) => console.error('Erreur : ', err),
      complete: () => this.selectedTabIndex = 0
    });
  }

  handlePageEvent($event: PageEvent) {
    this.teamService.getTeams($event.pageIndex, $event.pageSize).subscribe(teams => {
      this._paginatedResource.set(teams);
    } );
  }

  onUpdateTeamEvent(team: Team) {
    this._teamUpdating.set(team);
  }

}
