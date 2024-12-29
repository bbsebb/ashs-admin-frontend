import {Observable} from "rxjs";
import {PaginatedResource} from "../models/hal-forms/paginated-resource";
import {Hall} from "../models/hall";
import {InjectionToken} from "@angular/core";

export const HALL_SERVICE = new InjectionToken<IHallService>('hall.service');

export interface IHallService {
    getHalls(page?:number, size?:number, sort?:string[]): Observable<PaginatedResource<Hall>>;

    save(hall: Hall, url?: string): Observable<Hall>;

    update(hall: Hall): Observable<Hall>;

    delete(hall: Hall): Observable<void>;
}
