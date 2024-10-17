import {Resource} from "./resource";
import {Page} from "./page";
import {Link} from "./link";
import {PaginatedModel} from "./paginated-model";
import {HalForms} from "./hal-forms";

export class PaginatedResource<T extends Resource> extends Resource implements PaginatedModel<T> {
  _embedded: { [key: string]: T[] } = {};
  page: Page = {
    size: 0,
    totalElements: 0,
    totalPages: 0,
    number: 0
  };

  constructor(paginatedModel?: PaginatedModel<T>) {
    super(paginatedModel ?? { _links: { self: { href: '' } }, _templates: {} }); // Valeurs par défaut minimales pour _links et _templates

    if (paginatedModel) {
      Object.keys(paginatedModel._embedded).forEach(key => {
        this._embedded[key] = paginatedModel._embedded[key].map(data => this.mapToResource(data));
      });
      this.page = paginatedModel.page;
    }
  }
  // Méthode privée pour transformer un objet brut en instance de T (par exemple, Coach)
  private mapToResource(data: any): T {
    const halForms: HalForms = {
      _links: data._links ?? {},  // Extraire les liens HAL-Forms
      _templates: data._templates ?? {}  // Extraire les templates HAL-Forms
    };
    const resourceInstance = new Resource(halForms) as T;
    // Retourner un objet de type T en utilisant les données JSON + HalForms
    return Object.assign(resourceInstance, data) as T;
  }


  getEmbedded(key: string): T[] {
    const embedded = this._embedded[key];
    if (!embedded) {
      throw new Error(`Embedded with key "${key}" not found.`);
    }
    return embedded;
  }

  setEmbedded(key: string, value: T[]): void {
    this._embedded[key] = value;
  }

  hasNext(): boolean {
    return this.hasLink("next");
  }

  hasPrevious(): boolean {
    return this.hasLink("prev");
  }

  hasFirst(): boolean {
    return this.hasLink("first");
  }

  hasLast(): boolean {
    return this.hasLink("last");
  }

  getNext(): Link {
    return this.getLink("next");
  }

  getPrevious(): Link {
    return this.getLink("prev");
  }

  getFirst(): Link {
    return this.getLink("first");
  }

  getLast(): Link {
    return this.getLink("last");
  }

}
