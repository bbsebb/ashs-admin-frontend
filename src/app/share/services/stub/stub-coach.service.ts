import { Injectable } from '@angular/core';
import {ICoachService} from "../i-coach.service";
import {Coach} from "../../models/coach";
import {Observable, of} from "rxjs";
import {PaginatedResource} from "../../models/hal-forms/paginated-resource";

@Injectable({
  providedIn: 'root'
})
export class StubCoachService implements ICoachService{

  constructor() { }

  delete(coach: Coach): Observable<void> {
    return of();
  }

  getCoaches(page: number, size: number, sort: string[]): Observable<PaginatedResource<Coach>> {
    return of(stubPaginatedCoaches);
  }

  save(coach: Coach, url: string): Observable<Coach> {
    return of(coach);
  }

  update(coach: Coach): Observable<Coach> {
    return of(coach);
  }
}

const stubPaginatedCoaches: PaginatedResource<Coach> = new PaginatedResource<Coach>();
