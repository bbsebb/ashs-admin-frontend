import { Pipe, PipeTransform } from '@angular/core';
import {Gender} from "../models/gender";

@Pipe({
  name: 'gender',
  standalone: true
})
export class GenderPipe implements PipeTransform {

  private size = {
    short: {
      [Gender.Feminine]: 'F',
      [Gender.Masculine]: 'M',
      [Gender.Mixed]: ''
    },
    medium: {
      [Gender.Feminine]: 'Fem.',
      [Gender.Masculine]: 'Masc.',
      [Gender.Mixed]: ''
    },
    long: {
      [Gender.Feminine]: 'Féminine',
      [Gender.Masculine]: 'Masculine',
      [Gender.Mixed]: 'Mixte'
    }
  };

  transform(value: Gender, format: 'short' | 'medium' | 'long' = 'long'): string {
    return this.size[format][value] || '';
  }

}
