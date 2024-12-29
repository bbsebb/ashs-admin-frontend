import {Observable} from "rxjs";
import {PaginatedResource} from "../models/hal-forms/paginated-resource";
import {Team} from "../models/team";
import {InjectionToken} from "@angular/core";
export const TEAM_SERVICE = new InjectionToken<ITeamService>('team.service');

export interface ITeamService {
    getTeams(page?:number, size?:number, sort?:string[]): Observable<PaginatedResource<Team>>;

    save(team: Team, url?: string): Observable<Team>;

    update(team: Team): Observable<Team>;

    delete(team: Team): Observable<void>;
}
