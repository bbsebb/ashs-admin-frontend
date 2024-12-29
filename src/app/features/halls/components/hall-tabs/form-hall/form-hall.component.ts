import {Component, inject, input, InputSignal, OnInit, output, viewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from "@angular/forms";
import {Hall, IHall} from "../../../../../share/models/hall";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {Address} from "../../../../../share/models/address";

@Component({
    selector: 'app-form-hall',
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
    templateUrl: './form-hall.component.html',
    styleUrl: './form-hall.component.scss'
})
export class FormHallComponent implements OnInit {
  readonly formDirective = viewChild.required<FormGroupDirective>('formDirective');
  private fb: FormBuilder = inject(FormBuilder);
  hall: InputSignal<Hall | undefined> = input<Hall | undefined>(undefined,{alias: 'hall'});
  submitSaveHall = output<Hall>();
  submitUpdateHall = output<Hall>()
  hallForm!: FormGroup ;



  ngOnInit(): void {
    // Initialisation du formulaire
    this.hallForm = this.initHallForm();

    const hall = this.hall();
    if(hall) {
      this.hallForm.patchValue({
        name: hall.name,
        address: {
          street: hall.address.street,
          city: hall.address.city,
          postalCode: hall.address.postalCode,
          country: hall.address.country
        },
      });
    }
  }

  initHallForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        postalCode: ['', Validators.required],
        country: ['', Validators.required],
      }),
    });
  }

  onSubmit(formDirective: FormGroupDirective): void {
    const hall = this.hall();
    if(hall) {
      const updatedHall = Hall.update(hall,this.hallForm.value);
      this.submitUpdateHall.emit(updatedHall);
    } else {
      this.submitSaveHall.emit(new Hall(this.hallForm.value));
    }
  }

  hasError(field: string): boolean {
    return this.hallForm.get(field)?.invalid || false;
  }

  displayError(field: string): string {
    if (this.hallForm.get(field)?.hasError('required')) {
      return 'Ce champ est obligatoire';
    } else if (this.hallForm.get(field)?.hasError('email')) {
      return 'Email invalide';
    } else {
      return '';
    }
  }

  public reset():void {
    this.formDirective().resetForm();
    this.hallForm.reset();
  }

}
