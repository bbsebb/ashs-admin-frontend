import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Link} from "../models/hal-forms/link";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
 private readonly httpClient: HttpClient = inject(HttpClient);

 getByLink<T>(link:Link): Observable<T> {
    return this.httpClient.get<T>(link.href);
 }
}
