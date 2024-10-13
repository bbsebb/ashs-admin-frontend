import {Component, inject, input, InputSignal, OnInit, output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Hall, IHall} from "../../../../../share/models/hall";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {Address} from "../../../../../share/models/address";

@Component({
  selector: 'app-form-hall',
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
  templateUrl: './form-hall.component.html',
  styleUrl: './form-hall.component.scss'
})
export class FormHallComponent implements OnInit {

  private fb: FormBuilder = inject(FormBuilder);
  _hall: InputSignal<Hall | undefined> = input<Hall | undefined>(undefined,{alias: 'hall'});
  submitSaveHall = output<Hall>();
  submitUpdateHall = output<Hall>()
  hallForm!: FormGroup ;



  ngOnInit(): void {
    // Initialisation du formulaire
    this.hallForm = this.fb.group({
      name: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const hall = this._hall();
    const address: Address = {
      street: this.hallForm.get('street')?.value,
      city: this.hallForm.get('city')?.value,
      postalCode: this.hallForm.get('postalCode')?.value,
      country: this.hallForm.get('country')?.value
    }
    const hallForm: IHall = {
      name: this.hallForm.get('name')?.value,
      address: address
    };

    if(hall) {
      const updatedHall = Hall.update(hall,hallForm);
      this.submitUpdateHall.emit(updatedHall);
    } else {
      this.submitSaveHall.emit(Hall.create(hallForm));
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

}
