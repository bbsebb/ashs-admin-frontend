import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {environment} from "@environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {PaginatedResource} from "../models/hal-forms/paginated-resource";

import {mapPaginatedModel, PaginatedModel} from "../models/hal-forms/paginated-model";
import {map} from "rxjs/operators";
import {TrainingSession} from "../models/training-session";
import {ErrorHandlingService} from "./error-handling.service";
import {ITrainingSessionService} from "./i-training-session.service";


@Injectable({
  providedIn: 'root'
})
export class TrainingSessionService implements ITrainingSessionService {
  private errorService: ErrorHandlingService = inject(ErrorHandlingService)
  private http: HttpClient = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/training-service/trainingSessions`;


  getTrainingSessions(page = 0, size = 10, sort:string[]  = []): Observable<PaginatedResource<TrainingSession>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    for (let s of sort) {
      params = params.append('sort', s);
    }
    return this.http.get<PaginatedModel<TrainingSession>>(this.apiUrl, {params}).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorService.handleError(error);
        return throwError(() => error);
      }),
      map(paginatedModel => mapPaginatedModel(paginatedModel, TrainingSession)),
      map(paginatedModel => new PaginatedResource<TrainingSession>(paginatedModel)),
    );
  }


  //Le problème est que coach est crée ici et ne contient donc pas le href, et de toute façon, on devrait utiliser celui de caochES
  save(trainingSession: TrainingSession, url: string = this.apiUrl): Observable<TrainingSession> {
    return this.http.post<TrainingSession>(url, trainingSession).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorService.handleError(error);
        return throwError(() => error);
      })
    );
  }

  update(trainingSession: TrainingSession): Observable<TrainingSession> {
    return this.http.put<TrainingSession>(trainingSession.getTemplate("updateTrainingSession").target ?? trainingSession.getSelfLink().href, trainingSession).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorService.handleError(error);
        return throwError(() => error);
      })
    );
  }

  delete(trainingSession: TrainingSession): Observable<void> {
    return this.http.delete<void>(trainingSession.getTemplate("deleteTrainingSession").target ?? trainingSession.getSelfLink().href).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorService.handleError(error);
        return throwError(() => error);
      }),
    );
  }


}
