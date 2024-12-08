import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {PaginatedResource} from "../models/hal-forms/paginated-resource";
import {mapPaginatedModel, PaginatedModel} from "../models/hal-forms/paginated-model";
import {map} from "rxjs/operators";
import {Hall} from "../models/hall";
import {TrainingSession} from "../models/training-session";
import {ErrorHandlingService} from "./error-handling.service";

@Injectable({
  providedIn: 'root'
})
export class HallService {

  private http: HttpClient = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/training-service/halls`;
  private errorService = inject(ErrorHandlingService);




  getHalls(page = 0, size = 10, sort = []): Observable<PaginatedResource<Hall>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    for(let s of sort) {
      params = params.append('sort', s);
    }
    return this.http.get<PaginatedModel<Hall>>(this.apiUrl, { params }).pipe(
      catchError((error:HttpErrorResponse)=> {
        this.errorService.handleError(error);
        return throwError(() => error);
      }),
      map(paginatedModel => mapPaginatedModel(paginatedModel, Hall)),
      map(paginatedModel => new PaginatedResource<Hall>(paginatedModel)),
    );
  }
  //Le problème est que coach est crée ici et ne contient donc pas le href, et de toute façon, on devrait utiliser celui de caochES
  save(hall: Hall,url: string = this.apiUrl): Observable<Hall> {
    return this.http.post<Hall>(url, hall).pipe(
      catchError((error:HttpErrorResponse)=> {
        this.errorService.handleError(error);
        return throwError(() => error);
      })
    );;
  }


  update(hall: Hall): Observable<Hall> {
    return this.http.put<Hall>(hall.getTemplate("updateHall").target ?? hall.getSelfLink().href, hall).pipe(
      catchError((error:HttpErrorResponse)=> {
        this.errorService.handleError(error);
        return throwError(() => error);
      })
    );;
  }

  delete(hall: Hall): Observable<void> {
    return this.http.delete<void>(hall.getTemplate("deleteHall").target ?? hall.getSelfLink().href).pipe(
      catchError((error:HttpErrorResponse)=> {
        this.errorService.handleError(error);
        return throwError(() => error);
      })
    );;
  }


}
