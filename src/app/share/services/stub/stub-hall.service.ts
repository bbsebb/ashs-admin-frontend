import { Injectable } from '@angular/core';
import {IHallService} from "../i-hall.service";
import {Hall} from "../../models/hall";
import {catchError, Observable, of, throwError} from "rxjs";
import {PaginatedResource} from "../../models/hal-forms/paginated-resource";
import {HttpErrorResponse} from "@angular/common/http";
import {map} from "rxjs/operators";
import {mapPaginatedModel, PaginatedModel} from "../../models/hal-forms/paginated-model";

@Injectable({
  providedIn: 'root'
})
export class StubHallService implements IHallService{

  constructor() { }

  delete(hall: Hall): Observable<void> {
    return of();
  }

  getHalls(page: number, size: number, sort: string[]): Observable<PaginatedResource<Hall>> {
    return of(JSON.parse(stubHallsJson) as PaginatedModel<Hall>).pipe(
      map(paginatedModel => mapPaginatedModel(paginatedModel, Hall)),
      map(paginatedModel => new PaginatedResource<Hall>(paginatedModel)),
    );
  }

  save(hall: Hall, url: string): Observable<Hall> {
    return of(hall);
  }

  update(hall: Hall): Observable<Hall> {
    return of(hall);
  }
}

const stubPaginatedHalls: PaginatedResource<Hall> = new PaginatedResource<Hall>();

const stubHallsJson: string = `
{
  "page": {
    "size": 10,
    "totalElements": 2,
    "totalPages": 1,
    "number": 0
  },
  "_embedded": {
    "halls": [
      {
        "id": 6,
        "name": "Gymnase Municipal",
        "address": {
          "street": "16 rue des Vosges",
          "city": "Hoenheim",
          "postalCode": "67800",
          "country": "France"
        },
        "_links": {
          "self": {
            "href": "https://api.hoenheimsports.fr/training-service/halls/6"
          }
        }
      },
      {
        "id": 7,
        "name": "Salle Omnisports",
        "address": {
          "street": "1 rue du Stade",
          "city": "Hoenheim",
          "postalCode": "67800",
          "country": "France"
        },
        "_links": {
          "self": {
            "href": "https://api.hoenheimsports.fr/training-service/halls/7"
          }
        }
      }
    ]
  },
  "_links": {
    "self": {
      "href": "https://api.hoenheimsports.fr/training-service/halls"
    }
  }
}
`;
