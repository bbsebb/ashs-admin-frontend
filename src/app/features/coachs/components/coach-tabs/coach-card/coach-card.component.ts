import {Component, input, InputSignal, output} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {Coach} from "../../../../../share/models/coach";
import {MatButtonModule} from "@angular/material/button";
import {endWith} from "rxjs";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-coach-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './coach-card.component.html',
  styleUrl: './coach-card.component.scss'
})
export class CoachCardComponent {
  _coach: InputSignal<Coach> = input.required<Coach>({alias: 'coach'});
  deleteCoach= output<Coach>({alias: 'deleteCoach'});
  modifyCoach= output<Coach>({alias: 'modifyCoach'});


  protected readonly endWith = endWith;

  onModify() {
    this.modifyCoach.emit(this._coach());
  }

  onDelete() {
    this.deleteCoach.emit(this._coach());
  }
}
