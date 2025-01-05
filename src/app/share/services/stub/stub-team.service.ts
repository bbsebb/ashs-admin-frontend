import { Injectable } from '@angular/core';
import {ITeamService} from "../i-team.service";
import {Team} from "../../models/team";
import {Observable, of} from "rxjs";
import {PaginatedResource} from "../../models/hal-forms/paginated-resource";

@Injectable({
  providedIn: 'root'
})
export class StubTeamService implements ITeamService{

  constructor() { }

  delete(team: Team): Observable<void> {
    return of();
  }

  getTeams(page: number, size: number, sort: string[]): Observable<PaginatedResource<Team>> {
    return of(stubPaginatedTeams);
  }

  save(team: Team, url: string): Observable<Team> {
    return of(team);
  }

  update(team: Team): Observable<Team> {
    return of(team);
  }
}

const stubPaginatedTeams: PaginatedResource<Team> = new PaginatedResource<Team>();
