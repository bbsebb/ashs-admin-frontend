import {Resource} from "./hal-forms/resource";
import {HalForms} from "./hal-forms/hal-forms";
import {Gender} from "./gender";
import {TrainingSession} from "./training-session";
import {IHall} from "./hall";

export class Team extends Resource implements ITeam {
  id?: number;
  category: string;
  gender: Gender;
  teamNumber: number;
  trainingSessions: TrainingSession[];

  constructor(halForms:HalForms,team: ITeam) {
    super(halForms);
    this.id = team.id;
    this.category = team.category;
    this.gender = team.gender;
    this.teamNumber = team.teamNumber;
    this.trainingSessions = team.trainingSessions;
  }


  static create(team: any): Team {
    // Extraire les liens et templates HAL-Forms de l'objet hall brut
    const halForms: HalForms = {
      _links: team._links ?? {}, // Assurez-vous que les liens sont extraits
      _templates: team._templates ?? {} // Assurez-vous que les templates sont extraits
    };

    return new Team(halForms, {
      id: team.id,
      category: team.category,
      gender: team.gender,
      teamNumber: team.teamNumber,
      trainingSessions: team.trainingSessions
    });
  }

  static update(team: Team, teamData: ITeam): Team {
    team.gender = teamData.gender;
    team.category = teamData.category;
    team.teamNumber = teamData.teamNumber;
    team.trainingSessions = teamData.trainingSessions
    return team;
  }
}
export interface ITeam {
  id?: number;
  gender: Gender;
  category: string;
  teamNumber: number;
  trainingSessions: TrainingSession[];
}
