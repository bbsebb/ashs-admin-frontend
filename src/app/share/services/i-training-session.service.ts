import {Observable} from "rxjs";
import {PaginatedResource} from "../models/hal-forms/paginated-resource";
import {TrainingSession} from "../models/training-session";
import {InjectionToken} from "@angular/core";
export const TRAINING_SESSION_SERVICE = new InjectionToken<ITrainingSessionService>('training-session.service');

export interface ITrainingSessionService {
    getTrainingSessions(page?:number, size?:number, sort?: string[]): Observable<PaginatedResource<TrainingSession>>;

    save(trainingSession: TrainingSession, url?: string): Observable<TrainingSession>;

    update(trainingSession: TrainingSession): Observable<TrainingSession>;

    delete(trainingSession: TrainingSession): Observable<void>;
}
