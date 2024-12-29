import {Component, inject, signal, viewChild, WritableSignal} from '@angular/core';
import {Team} from "../../../../share/models/team";
import {TeamService} from "../../../../share/services/team.service";
import {PaginatedResource} from "../../../../share/models/hal-forms/paginated-resource";
import {PageEvent} from "@angular/material/paginator";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {ViewTeamsComponent} from "./view-teams/view-teams.component";
import {FormTeamComponent} from "./form-team/form-team.component";


@Component({
    selector: 'app-team-tabs',
    imports: [
        MatTab,
        MatTabGroup,
        ViewTeamsComponent,
        FormTeamComponent
    ],
    templateUrl: './team-tabs.component.html',
    styleUrl: './team-tabs.component.scss'
})
export class TeamTabsComponent {
  teamUpdating = signal<Team | undefined>(undefined);
  teamFormComponentSignal = viewChild(FormTeamComponent)

  teamService: TeamService = inject(TeamService);

  private _selectedTabIndex: number = 0;
  paginatedResource: WritableSignal<PaginatedResource<Team>> = signal(new PaginatedResource<Team>());

  constructor() {
    this.getTeams();
  }


  get selectedTabIndex(): number {
    return this._selectedTabIndex;
  }

// Setter pour selectedTabIndex qui capture les changements
  set selectedTabIndex(index: number) {
    if (this.selectedTabIndex !== index) {
      if (this.selectedTabIndex === 2) {
        this.teamUpdating.set(undefined);
      }
      this._selectedTabIndex = index;
    }
  }

  getTeams() {
    this.teamService.getTeams().subscribe(teams => {
      this.paginatedResource.set(teams);
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
      error: (err) => this.getTeams(),
      complete: () => {
        this.teamFormComponentSignal()?.reset();
        this.teamUpdating.set(undefined);
        this.selectedTabIndex = 0;
      }
    })
  }

  onSubmitSaveTeam(team: Team) {
    this.teamService.save(team,this.paginatedResource().getTemplate("createTeam").target).subscribe({
      next: () => this.getTeams(), //refresh
      error: (err) => this.getTeams(),
      complete: () => {
        this.teamFormComponentSignal()?.reset();
        this.selectedTabIndex = 0;
      }
    });
  }

  handlePageEvent($event: PageEvent) {
    this.teamService.getTeams($event.pageIndex, $event.pageSize).subscribe(teams => {
      this.paginatedResource.set(teams);
    } );
  }

  onUpdateTeamEvent(team: Team) {
    this.selectedTabIndex = 2;
    this.teamUpdating.set(team);
  }

}
