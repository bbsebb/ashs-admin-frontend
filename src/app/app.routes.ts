import { Routes } from '@angular/router';
import {HomeComponent} from "./features/home/components/home/home.component";
import {ViewCoachesComponent} from "./features/coachs/components/coach-tabs/view-coaches/view-coaches.component";
import {FormCoachComponent} from "./features/coachs/components/coach-tabs/form-coach/form-coach.component";
import {CoachTabsComponent} from "./features/coachs/components/coach-tabs/coach-tabs.component";
import {HallTabsComponent} from "./features/halls/components/hall-tabs/hall-tabs.component";
import {TeamTabsComponent} from "./features/teams/components/team-tabs/team-tabs.component";
import {
  TrainingSessionTabsComponent
} from "./features/training-session/components/training-session-tabs/training-session-tabs.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'coaches', component: CoachTabsComponent},
  { path: 'halls', component: HallTabsComponent},
  { path: 'teams', component: TeamTabsComponent},
  { path: 'training-sessions', component: TrainingSessionTabsComponent},
  { path: '**', redirectTo: 'home' }
];
