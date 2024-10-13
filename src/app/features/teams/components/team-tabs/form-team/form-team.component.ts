import {Component, inject, input, InputSignal, OnInit, output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Team} from "../../../../../share/models/team";
import {MatCard, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {Gender} from "../../../../../share/models/gender";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-form-team',
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
    MatInput
  ],
  templateUrl: './form-team.component.html',
  styleUrl: './form-team.component.scss'
})
export class FormTeamComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  _team: InputSignal<Team | undefined> = input<Team | undefined>(undefined,{alias: 'team'});
  submitSaveTeam = output<Team>();
  submitUpdateTeam = output<Team>()
  teamForm!: FormGroup ;



  ngOnInit(): void {
    // Initialisation du formulaire
    // Initialisation du formulaire
    this.teamForm = this.fb.group({
      category: ['', Validators.required],
      gender: ['', Validators.required],
      teamNumber: [0, Validators.required],
      trainingSessions: this.fb.array([], Validators.required) // Utiliser un FormArray pour les sessions d'entraînement
    });

    const team = this._team();
    if (team) {
      this.teamForm.patchValue({
        category: team.category,
        gender: team.gender,
        teamNumber: team.teamNumber
      });
    }
  }

  onSubmit(): void {
    const team = this._team()

    if(team) {
      const updatedTeam = Team.update(team,this.teamForm.value);
      this.submitUpdateTeam.emit(updatedTeam);
    } else {
      this.submitSaveTeam.emit(this.teamForm.value);
    }

  }

  hasError(field: string): boolean {
    return this.teamForm.get(field)?.invalid || false;
  }

  displayError(field: string): string {
    if (this.teamForm.get(field)?.hasError('required')) {
      return 'Ce champ est obligatoire';
    } else if (this.teamForm.get(field)?.hasError('email')) {
      return 'Email invalide';
    } else {
      return '';
    }
  }


  protected readonly Gender = Gender;
  protected readonly Object = Object;
}
