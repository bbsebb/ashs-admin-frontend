import {HalForms} from "./hal-forms/hal-forms";
import {Resource} from "./hal-forms/resource";

export class Coach extends Resource {
  name: string;
  surname: string;
  email: string;
  phone: string;

  constructor(halForms: HalForms, coach: ICoach) {
    super(halForms);  // Appel du constructeur de Resource pour initialiser _links et _templates
    this.name = coach.name;
    this.surname = coach.surname;
    this.email = coach.email;
    this.phone = coach.phone;
  }

  static create(coach: any): Coach {
    // Extraire les liens et templates HAL-Forms de l'objet coach brut
    const halForms: HalForms = {
      _links: coach._links ?? {}, // Assurez-vous que les liens sont extraits
      _templates: coach._templates ?? {} // Assurez-vous que les templates sont extraits
    };

    return new Coach(halForms, {
      name: coach.name,
      surname: coach.surname,
      email: coach.email,
      phone: coach.phone
    });
  }

  static update(coach: Coach,coachData: ICoach): Coach {
    coach.name = coachData.name;
    coach.surname = coachData.surname;
    coach.email = coachData.email;
    coach.phone = coachData.phone;
    return coach;
  }
}

export interface ICoach {
  name: string;
  surname: string;
  email: string;
  phone: string;
}
