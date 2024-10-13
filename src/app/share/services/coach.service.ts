import {inject, Injectable} from '@angular/core';
import {environment} from "src/environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {map} from "rxjs/operators";
import {PaginatedModel} from "../models/hal-forms/paginated-model";
import {Coach} from "../models/coach";
import {PaginatedResource} from "../models/hal-forms/paginated-resource";





@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/training-service/coaches`;


  getCoaches(page = 0, size = 10, sort = []): Observable<PaginatedResource<Coach>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    for(let s of sort) {
      params = params.append('sort', s);
    }
    return this.http.get<PaginatedModel<Coach>>(this.apiUrl, { params }).pipe(
      map(paginatedModel => new PaginatedResource<Coach>(paginatedModel)),
    );
  }
  //Le problème est que coach est crée ici et ne contient donc pas le href, et de toute façon, on devrait utiliser celui de caochES
  save(coach: Coach,url: string = this.apiUrl): Observable<Coach> {
    return this.http.post<Coach>(url, coach);
  }



  update(coach: Coach): Observable<Coach> {
    return this.http.put<Coach>(coach.getTemplate("updateCoach").target ?? coach.getSelfLink().href, coach);
  }

  delete(coach: Coach): Observable<void> {
    return this.http.delete<void>(coach.getTemplate("deleteCoach").target ?? coach.getSelfLink().href);
  }



}
