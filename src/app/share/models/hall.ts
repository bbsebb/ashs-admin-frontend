import {Resource} from "./hal-forms/resource";
import {HalForms} from "./hal-forms/hal-forms";
import {Address} from "./address";

export class Hall extends Resource implements IHall{
  id?: number;
  name: string;
  address: Address;

  constructor(halForms: HalForms, hall: IHall) {
    super(halForms);// Appel du constructeur de Resource pour initialiser _links et _templates
    this.id = hall.id;
    this.name = hall.name;
    this.address = hall.address;
  }

  static create(hall: any): Hall {
    // Extraire les liens et templates HAL-Forms de l'objet hall brut
    const halForms: HalForms = {
      _links: hall._links ?? {}, // Assurez-vous que les liens sont extraits
      _templates: hall._templates ?? {} // Assurez-vous que les templates sont extraits
    };

    return new Hall(halForms, {
      id: hall.id,
      name: hall.name,
      address: hall.address
    });
  }

  static update(hall: Hall,hallData: IHall): Hall {
    hall.name = hallData.name;
    hall.address = hallData.address;
    return hall;
  }
}

export interface IHall {
  id?: number;
  name: string;
  address: Address;
}
