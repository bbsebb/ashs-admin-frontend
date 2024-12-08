import {Resource} from "./hal-forms/resource";
import {TimeSlot} from "./time-slot";
import {Hall} from "./hall";
import {HalForms} from "./hal-forms/hal-forms";

export class TrainingSession extends Resource implements ITrainingSession {
  id?: number;
  timeSlot: TimeSlot;
  hall: Hall;
  constructor(trainingSession: TrainingSession) {
    // Extraire les liens et templates HAL-Forms de l'objet hall brut
    const halForms: HalForms = {
      _links: trainingSession._links ?? {}, // Assurez-vous que les liens sont extraits
      _templates: trainingSession._templates ?? {} // Assurez-vous que les templates sont extraits
    };
    super(halForms);  // Appel du constructeur de Resource pour initialiser _links et _templates
    this.id = trainingSession.id;
    this.timeSlot = trainingSession.timeSlot;
    this.hall = new Hall(trainingSession.hall);
  }




  static update(trainingSession: TrainingSession,trainingSessionData: ITrainingSession): TrainingSession {
    trainingSession.timeSlot = trainingSessionData.timeSlot;
    trainingSession.hall = new Hall(trainingSessionData.hall);
    return trainingSession;
  }
}

export interface ITrainingSession {
  id?: number;
  timeSlot: TimeSlot;
  hall: Hall;
}
