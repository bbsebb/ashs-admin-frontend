import {Links} from "./links";
import {Templates} from "./templates";
import {Link} from "./link";
import {Template} from "./template";
import {HalForms} from "./hal-forms";

export class Resource implements HalForms {
  _links: Links;
  _templates: Templates;


  constructor(halForms: HalForms) {
    this._links = halForms._links;
    this._templates = halForms._templates;

  }

  hasLink(rel: string): boolean {
    return !!this._links[rel];
  }

  getLink(key: string): Link {
    const link = this._links[key];
    if (!link) {
      throw new Error(`Link with key "${key}" not found.`);
    }
    return link;
  }

  getSelfLink(): Link {
    return this.getLink("self");
  }

  getTemplate(key: string): Template {
    if(!this._templates) {
      throw new Error(`Templates not found.`);
    }
    const template = this._templates[key];
    if (!template) {
      throw new Error(`Template with key "${key}" not found.`);
    }
    return template;
  }

  hasTemplate(key: string): boolean {
    try {
      this.getTemplate(key);
      return true;
    } catch (error) {
      // Gestion de l'erreur ici si nécessaire, sinon retour false pour ngIf
      console.warn(`Template not found for key: ${key}`);
      return false;
    }
  }

}
