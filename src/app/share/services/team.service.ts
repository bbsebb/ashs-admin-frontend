import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {PaginatedResource} from "../models/hal-forms/paginated-resource";
import {Hall} from "../models/hall";
import {mapPaginatedModel, PaginatedModel} from "../models/hal-forms/paginated-model";
import {map} from "rxjs/operators";
import {Team} from "../models/team";
import {TrainingSession} from "../models/training-session";
import {ErrorHandlingService} from "./error-handling.service";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private errorService: ErrorHandlingService = inject(ErrorHandlingService)
  private http: HttpClient = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/training-service/teams`;


  getTeams(page = 0, size = 10, sort = []): Observable<PaginatedResource<Team>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    for(let s of sort) {
      params = params.append('sort', s);
    }
    return this.http.get<PaginatedModel<Team>>(this.apiUrl, { params }).pipe(
      catchError((error:HttpErrorResponse)=> {
        this.errorService.handleError(error);
        return throwError(() => error);
      }),
      map(paginatedModel => mapPaginatedModel(paginatedModel, Team)),
      map(paginatedModel => new PaginatedResource<Team>(paginatedModel)),
    );
  }
  //Le problème est que coach est crée ici et ne contient donc pas le href, et de toute façon, on devrait utiliser celui de caochES
  save(team: Team,url: string = this.apiUrl): Observable<Team> {
    return this.http.post<Team>(url, team).pipe(
      catchError((error:HttpErrorResponse)=> {
        this.errorService.handleError(error);
        return throwError(() => error);
      })
    );;
  }



  update(team: Team): Observable<Team> {
    return this.http.put<Team>(team.getTemplate("updateTeam").target ?? team.getSelfLink().href, team).pipe(
      catchError((error:HttpErrorResponse)=> {
        this.errorService.handleError(error);
        return throwError(() => error);
      })
    );;
  }

  delete(team: Team): Observable<void> {
    return this.http.delete<void>(team.getTemplate("deleteTeam").target ?? team.getSelfLink().href).pipe(
      catchError((error:HttpErrorResponse)=> {
        this.errorService.handleError(error);
        return throwError(() => error);
      })
    );;
  }

}
