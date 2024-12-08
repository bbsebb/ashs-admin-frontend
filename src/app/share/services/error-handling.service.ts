import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: HttpErrorResponse): void {
    let errorDetails: string[] = ['Une erreur est survenue'];
    if (error.error) {
      if (typeof error.error === 'object') {
        // Suppose que l'erreur suit le format ApiErrorDTO
        errorDetails = error.error.details || ['Une erreur est survenue'];
      }
    }

    // Affiche le message d'erreur dans une Snackbar
    this.snackBar.open(
      `${errorDetails.join('\n')}`,
      'Close',
      { duration: 5000 }
    );
  }
}
