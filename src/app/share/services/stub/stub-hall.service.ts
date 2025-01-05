import { Injectable } from '@angular/core';
import {IHallService} from "../i-hall.service";
import {Hall} from "../../models/hall";
import {Observable, of} from "rxjs";
import {PaginatedResource} from "../../models/hal-forms/paginated-resource";

@Injectable({
  providedIn: 'root'
})
export class StubHallService implements IHallService{

  constructor() { }

  delete(hall: Hall): Observable<void> {
    return of();
  }

  getHalls(page: number, size: number, sort: string[]): Observable<PaginatedResource<Hall>> {
    return of(stubPaginatedHalls);
  }

  save(hall: Hall, url: string): Observable<Hall> {
    return of(hall);
  }

  update(hall: Hall): Observable<Hall> {
    return of(hall);
  }
}

const stubPaginatedHalls: PaginatedResource<Hall> = new PaginatedResource<Hall>();
