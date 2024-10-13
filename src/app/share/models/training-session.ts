import {Resource} from "./hal-forms/resource";
import {TimeSlot} from "./time-slot";
import {Hall, IHall} from "./hall";
import {HalForms} from "./hal-forms/hal-forms";

export class TrainingSession extends Resource implements ITrainingSessions {

  timeSlot: TimeSlot;
  hall: Hall;
  constructor(halForms: HalForms, trainingSession: ITrainingSessions) {
    super(halForms);  // Appel du constructeur de Resource pour initialiser _links et _templates
    this.timeSlot = trainingSession.timeSlot;
    this.hall = trainingSession.hall
  }


  static create(trainingSession: any): TrainingSession {
    // Extraire les liens et templates HAL-Forms de l'objet hall brut
    const halForms: HalForms = {
      _links: trainingSession._links ?? {}, // Assurez-vous que les liens sont extraits
      _templates: trainingSession._templates ?? {} // Assurez-vous que les templates sont extraits
    };

    return new TrainingSession(halForms, {
      timeSlot: {
        dayOfWeek: trainingSession.timeSlot.dayOfWeek,
        startTime: trainingSession.timeSlot.startTime,
        endTime: trainingSession.timeSlot.endTime
      },
      hall: trainingSession.hall
    });
  }

  static update(trainingSession: TrainingSession,trainingSessionData: ITrainingSessions): TrainingSession {
    trainingSession.timeSlot = trainingSessionData.timeSlot;
    trainingSession.hall = trainingSessionData.hall;
    return trainingSession;
  }
}

export interface ITrainingSessions {

  timeSlot: TimeSlot;
  hall: Hall;
}
