import {Component, inject, input, InputSignal, OnInit, output} from '@angular/core';
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {CoachService} from "../../../../../share/services/coach.service";
import {Coach} from "../../../../../share/models/coach";
import {HalForms} from "../../../../../share/models/hal-forms/hal-forms";

@Component({
  selector: 'app-form-coach',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatError,
    ReactiveFormsModule
  ],
  templateUrl: './form-coach.component.html',
  styleUrl: './form-coach.component.scss'
})
export class FormCoachComponent implements OnInit {

  private fb: FormBuilder = inject(FormBuilder);
  coach: InputSignal<Coach | undefined> = input<Coach | undefined>(undefined);
  submitSaveCoach = output<Coach>();
  submitUpdateCoach = output<Coach>()
  coachForm!: FormGroup ;



  ngOnInit(): void {
    // Initialisation du formulaire
    this.coachForm = this.fb.group({
      email: [this.coach()?.email,[Validators.required, Validators.email]],
      name: [this.coach()?.name,Validators.required],
      surname: [this.coach()?.surname,Validators.required],
      phone: [this.coach()?.phone,Validators.required]
    });
  }

  onSubmit(): void {
    const coach = this.coach()

    if(coach) {
      const updatedCoach = Coach.update(coach,this.coachForm.value);
      this.submitUpdateCoach.emit(updatedCoach);
    } else {
      this.submitSaveCoach.emit(this.coachForm.value);
    }

  }

  hasError(field: string): boolean {
    return this.coachForm.get(field)?.invalid || false;
  }

  displayError(field: string): string {
    if (this.coachForm.get(field)?.hasError('required')) {
      return 'Ce champ est obligatoire';
    } else if (this.coachForm.get(field)?.hasError('email')) {
      return 'Email invalide';
    } else {
      return '';
    }
  }
}