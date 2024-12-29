import {Component, inject, input, InputSignal, OnInit, output, Signal, viewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from "@angular/forms";
import {ITrainingSession, TrainingSession} from "../../../../../share/models/training-session";
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
import {DayOfWeekPipe} from "../../../../../share/pipes/day-of-week.pipe";
import {Router} from "@angular/router";
import {timeSlotValidator} from "../../../../../share/validators/time-slot.validator";


@Component({
    selector: 'app-form-training-session',
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
        GoogleMapsModule,
        DayOfWeekPipe
    ],
    templateUrl: './form-training-session.component.html',
    styleUrl: './form-training-session.component.scss'
})
export class FormTrainingSessionComponent implements OnInit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly hallService: HallService = inject(HallService);
  private readonly router: Router = inject(Router);
  private readonly formDirective = viewChild.required<FormGroupDirective>('formDirective');
  protected readonly DayOfWeek = DayOfWeek;
  protected readonly Object = Object;
  inputSignal: InputSignal<TrainingSession | undefined> = input<TrainingSession | undefined>(undefined,{alias: 'trainingSession'});
  submitSaveTrainingSession = output<TrainingSession>();
  submitUpdateTrainingSession = output<TrainingSession>()
  trainingSessionForm!: FormGroup;

  hallList = toSignal<PaginatedResource<Hall>>(this.hallService.getHalls());
  compareHalls(h1: Hall, h2: Hall): boolean {
    return h1 && h2 ? h1.id === h2.id : h1 === h2;
  }



  ngOnInit(): void {
    // Initialisation du formulaire

    this.trainingSessionForm = this.fb.group({
      timeSlot: this.fb.group({
        dayOfWeek: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
      }, {validators: timeSlotValidator()}),
      hall: [null, Validators.required],
    });
    const temp = this.inputSignal();
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

    onSubmit(formDirective: FormGroupDirective): void {
    const trainingSession = this.inputSignal();
    if(trainingSession) {
      this.submitUpdateTrainingSession.emit(TrainingSession.update(trainingSession,this.trainingSessionForm.value));
    } else {
      this.submitSaveTrainingSession.emit(new TrainingSession(this.trainingSessionForm.value));
    }
  }

  hasError(field: string): boolean {
    return this.trainingSessionForm.get(field)?.invalid || false;
  }

  displayError(fieldName: string): string {
    const field = this.trainingSessionForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Ce champ est obligatoire';
    } else if (field?.hasError('email')) {
      return 'Email invalide';
    } else if(field?.hasError('invalidTimeSlot')) {
      return `L'heure de début doit être antérieure à l'heure de fin.`;
    } else {
      return '';
    }
  }

  public reset():void {
    this.formDirective().resetForm();
    this.trainingSessionForm.reset();
  }
}
