import {ApplicationConfig, inject} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import {apiKeyInterceptor} from "./core/interceptors/api-key.interceptor";
import {COACH_SERVICE} from "./share/services/i-coach.service";
import {CoachService} from "./share/services/coach.service";
import {HallService} from "./share/services/hall.service";
import {HALL_SERVICE} from "./share/services/i-hall.service";
import {TEAM_SERVICE} from "./share/services/i-team.service";
import {TeamService} from "./share/services/team.service";
import {TRAINING_SESSION_SERVICE} from "./share/services/i-training-session.service";
import {TrainingSessionService} from "./share/services/training-session.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([apiKeyInterceptor])),
    {provide: COACH_SERVICE, useFactory: () => inject(CoachService)},
    {provide: HALL_SERVICE, useFactory: () => inject(HallService)},
    {provide: TEAM_SERVICE, useFactory: () => inject(TeamService)},
    {provide: TRAINING_SESSION_SERVICE, useFactory: () => inject(TrainingSessionService)}
  ]
};
