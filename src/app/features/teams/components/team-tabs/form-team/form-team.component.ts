import {Component, inject, input, InputSignal, OnInit, output, viewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from "@angular/forms";
import {Team} from "../../../../../share/models/team";
import {MatCard, MatCardActions, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {Gender} from "../../../../../share/models/gender";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {Category} from "../../../../../share/models/Category";
import {TrainingSessionService} from "../../../../../share/services/training-session.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {DayOfWeekPipe} from "../../../../../share/pipes/day-of-week.pipe";
import {TimePipe} from "../../../../../share/pipes/time.pipe";
import {CoachService} from "../../../../../share/services/coach.service";
import {DayOfWeek} from "../../../../../share/models/day-of-week";
import {PaginatedResource} from "../../../../../share/models/hal-forms/paginated-resource";
import {Hall} from "../../../../../share/models/hall";
import {HallService} from "../../../../../share/services/hall.service";
import {MatIcon} from "@angular/material/icon";
import {timeSlotValidator} from "../../../../../share/validators/time-slot.validator";

@Component({
    selector: 'app-form-team',
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
        MatIcon,
        DayOfWeekPipe,
        TimePipe,
        MatCardActions,
        MatMiniFabButton,
        MatIconButton
    ],
    templateUrl: './form-team.component.html',
    styleUrl: './form-team.component.scss'
})
export class FormTeamComponent implements OnInit {
  readonly formDirective = viewChild.required<FormGroupDirective>('formDirective');
  private fb: FormBuilder = inject(FormBuilder);
  trainingSessions = toSignal(inject(TrainingSessionService).getTrainingSessions());
  coaches = toSignal(inject(CoachService).getCoaches());
  hallList = toSignal<PaginatedResource<Hall>>(inject(HallService).getHalls());
  teamSignal: InputSignal<Team | undefined> = input<Team | undefined>(undefined,{alias: 'team'});
  submitSaveTeam = output<Team>();
  submitUpdateTeam = output<Team>()
  teamForm!: FormGroup ;
  compareHalls(h1: Hall, h2: Hall): boolean {
    return h1 && h2 ? h1.id === h2.id : h1 === h2;
  }
  compareCoaches (c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  };


  get sessions(): FormArray {
    return this.teamForm.get("trainingSessions") as FormArray
  }

  ngOnInit(): void {


    // Initialisation du formulaire
    this.teamForm = this.fb.group({
      category: ['', Validators.required],
      gender: ['', Validators.required],
      teamNumber: [1,[ Validators.required,Validators.min(1)]],
      trainingSessions: this.fb.array([this.initTrainingSession()]),
      coaches: ['',Validators.required] // Utiliser un FormArray pour les sessions d'entraînement
    });

    const team = this.teamSignal();
    if (team) {
      team.trainingSessions.forEach((session, index) => {
        if (index > 0) { // On ne veut pas ajouter une session pour la première session car elle existe déjà
          this.addTrainingSession();
        }
      });
      this.teamForm.patchValue({
        category: team.category,
        gender: team.gender,
        teamNumber: team.teamNumber,
        trainingSessions: team.trainingSessions,
        coaches: team.coaches
      });
    }
  }
  addTrainingSession() {
    (this.teamForm.get('trainingSessions') as FormArray)?.push(this.initTrainingSession());
  }

  removeTrainingSession($index: number) {
    (this.teamForm.get('trainingSessions') as FormArray)?.removeAt($index);
  }

  initTrainingSession() {
    return this.fb.group({
      id: [''],
      timeSlot: this.fb.group({
        dayOfWeek: ['', Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required]
      },{validators: timeSlotValidator()}),
      hall: ['', Validators.required]
    });
  }

  onSubmit(formDirective: FormGroupDirective): void {
    const team = this.teamSignal()
    if(team) {
      const updatedTeam = Team.update(team,this.teamForm.value);
      this.submitUpdateTeam.emit(updatedTeam);
    } else {
      this.submitSaveTeam.emit(this.teamForm.value);
    }
  }

  hasError(field: string): boolean {
    const control = this.teamForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  displayError(fieldName: string): string {
    const field = this.teamForm.get(fieldName);
    if (field?.hasError('required')) {
      return 'Ce champ est obligatoire';
    } else if (field?.hasError('email')) {
      return 'Email invalide';
    } else if(field?.hasError('invalidTimeSlot')) {
      return `L'heure de début doit être antérieure à l'heure de fin.`;
    } else {
      return 'Erreur inconnue';
    }
  }

  public reset():void {
    this.formDirective().resetForm();
    this.teamForm.reset();
  }



  protected readonly Gender = Gender;
  protected readonly Object = Object;
  protected readonly Category = Category;
  protected readonly DayOfWeek = DayOfWeek;


}
