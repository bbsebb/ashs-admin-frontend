import {Resource} from "./hal-forms/resource";
import {HalForms} from "./hal-forms/hal-forms";
import {Gender} from "./gender";
import {TrainingSession} from "./training-session";
import {IHall} from "./hall";
import {Category} from "./Category";
import {Coach} from "./coach";

export class Team extends Resource implements ITeam {
  id?: number;
  category: Category;
  gender: Gender;
  teamNumber: number;
  trainingSessions: TrainingSession[];
  coaches: Coach[];

  constructor(team: Team) {
    const halForms: HalForms = {
      _links: team._links ?? {}, // Assurez-vous que les liens sont extraits
      _templates: team._templates ?? {} // Assurez-vous que les templates sont extraits
    };
    super(halForms);
    this.id = team.id;
    this.category = team.category;
    this.gender = team.gender;
    this.teamNumber = team.teamNumber;
    this.trainingSessions = team.trainingSessions.map(trainingSession => new TrainingSession(trainingSession));
    this.coaches = team.coaches.map(coach => new Coach(coach));
  }


  static update(team: Team, teamData: ITeam): Team {
    team.gender = teamData.gender;
    team.category = teamData.category;
    team.teamNumber = teamData.teamNumber;
    team.trainingSessions = teamData.trainingSessions
    team.coaches = teamData.coaches;
    return team;
  }
}
export interface ITeam {
  id?: number;
  gender: Gender;
  category: Category;
  teamNumber: number;
  trainingSessions: TrainingSession[];
  coaches: Coach[];
}
