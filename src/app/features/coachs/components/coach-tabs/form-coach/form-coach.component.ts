import {Component, effect, inject, input, InputSignal, OnInit, output, viewChild} from '@angular/core';
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {Coach} from "../../../../../share/models/coach";

@Component({
    selector: 'app-form-coach',
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
  private readonly formDirective = viewChild.required<FormGroupDirective>('formDirective');
  private fb: FormBuilder = inject(FormBuilder);
  coach: InputSignal<Coach | undefined> = input<Coach | undefined>(undefined);
  submitSaveCoach = output<Coach>();
  submitUpdateCoach = output<Coach>()
  coachForm!: FormGroup ;




  ngOnInit(): void {
    const coach = this.coach()
    // Initialisation du formulaire
    this.coachForm = this.fb.group({
      email: [coach?.email,[Validators.required, Validators.email]],
      name: [coach?.name,Validators.required],
      surname: [coach?.surname,Validators.required],
      phone: [coach?.phone,Validators.required]
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

  public reset():void {
    this.formDirective().resetForm();
    this.coachForm.reset();
  }

}
