import {Component, inject, input, InputSignal, OnInit, output, Signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ITrainingSessions, TrainingSession} from "../../../../../share/models/training-session";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {DayOfWeek} from "../../../../../share/models/day-of-week";
import {Hall} from "../../../../../share/models/hall";
import {HallService} from "../../../../../share/services/hall.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {PaginatedResource} from "../../../../../share/models/hal-forms/paginated-resource";
import {TimeSlot} from "../../../../../share/models/time-slot";
import {GoogleMapsModule} from "@angular/google-maps";


@Component({
  selector: 'app-form-training-session',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    ReactiveFormsModule,
    MatFormField,
    MatOption,
    MatLabel,
    MatSelect,
    MatButton,
    MatError,
    MatInput,
    GoogleMapsModule
  ],
  templateUrl: './form-training-session.component.html',
  styleUrl: './form-training-session.component.scss'
})
export class FormTrainingSessionComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private hallService: HallService = inject(HallService);
  _trainingSession: InputSignal<TrainingSession | undefined> = input<TrainingSession | undefined>(undefined,{alias: 'trainingSession'});
  submitSaveTrainingSession = output<TrainingSession>();
  submitUpdateTrainingSession = output<TrainingSession>()
  trainingSessionForm!: FormGroup ;

  _hallList = toSignal<PaginatedResource<Hall>>(this.hallService.getHalls());



  ngOnInit(): void {
    // Initialisation du formulaire
    // Initialisation du formulaire
    this.trainingSessionForm = this.fb.group({
      dayOfWeek: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      hall: [null, Validators.required],
    });
    const temp = this._trainingSession();
    // Si une séance d'entraînement existe, peupler le formulaire
    if (temp) {
      this.trainingSessionForm.patchValue({
        timeSlot: {
          dayOfWeek: temp.timeSlot.dayOfWeek,
          startTime: temp.timeSlot.startTime,
          endTime: temp.timeSlot.endTime,
        },
        hall: temp.hall,
      });
    }
  }

  onSubmit(): void {
    const trainingSessionValue = this.extractTrainingSession();
    const trainingSession = this._trainingSession();
    if(trainingSession) {
      this.submitUpdateTrainingSession.emit(TrainingSession.update(trainingSession,trainingSessionValue));
    } else {
      this.submitSaveTrainingSession.emit(TrainingSession.create(trainingSessionValue));
    }
  }

  private extractTrainingSession() {
    const formValues = this.trainingSessionForm.value;

    // Reconstruire l'objet timeSlot avec les champs à plat
    const timeSlot: TimeSlot = {
      dayOfWeek: formValues.dayOfWeek,
      startTime: formValues.startTime,
      endTime: formValues.endTime,
    };

    const trainingSessionValue: ITrainingSessions = {
      timeSlot: timeSlot,
      hall: formValues.hall,
    };
    return trainingSessionValue;
  }

  hasError(field: string): boolean {
    return this.trainingSessionForm.get(field)?.invalid || false;
  }

  displayError(field: string): string {
    if (this.trainingSessionForm.get(field)?.hasError('required')) {
      return 'Ce champ est obligatoire';
    } else if (this.trainingSessionForm.get(field)?.hasError('email')) {
      return 'Email invalide';
    } else {
      return '';
    }
  }

  protected readonly DayOfWeek = DayOfWeek;
  protected readonly Object = Object;
}
