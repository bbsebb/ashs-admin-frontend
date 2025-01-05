import { Injectable } from '@angular/core';
import {ITrainingSessionService} from "../i-training-session.service";
import {TrainingSession} from "../../models/training-session";
import {Observable, of} from "rxjs";
import {PaginatedResource} from "../../models/hal-forms/paginated-resource";

@Injectable({
  providedIn: 'root'
})
export class StubTrainingSessionService implements ITrainingSessionService{

  constructor() { }

  delete(trainingSession: TrainingSession): Observable<void> {
    return of();
  }

  getTrainingSessions(page: number, size: number, sort: string[]): Observable<PaginatedResource<TrainingSession>> {
    return of(stubPaginatedTrainingSessions);
  }

  save(trainingSession: TrainingSession, url: string): Observable<TrainingSession> {
    return of(trainingSession);
  }

  update(trainingSession: TrainingSession): Observable<TrainingSession> {
    return of(trainingSession);
  }
}

const stubPaginatedTrainingSessions: PaginatedResource<TrainingSession> = new PaginatedResource<TrainingSession>();
