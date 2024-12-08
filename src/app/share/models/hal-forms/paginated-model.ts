import {HalForms} from "./hal-forms";
import {Page} from "./page";
import {Resource} from "./resource";

export interface PaginatedModel<T extends Resource> extends HalForms {
  _embedded: {
    [key: string]: T[];
  };
  page: Page;

}

export function mapPaginatedModel<T extends Resource>(data: PaginatedModel<T>, modelClass: new (item: any) => T): PaginatedModel<T> {
  if (!data._embedded || Object.keys(data._embedded).length === 0) {
    return {
      ...data, // Copie les autres propriétés originales (comme `page` et `_templates`)
      _embedded: {} // Renvoie un objet vide pour `_embedded`
    };
  }

  // Si `_embedded` contient des données
  const key = Object.keys(data._embedded)[0];
  return {
    ...data,
    _embedded: {
      [key]: data._embedded[key].map(item => new modelClass(item))
    }
  };
}
