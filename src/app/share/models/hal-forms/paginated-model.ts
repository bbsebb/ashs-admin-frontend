import {HalForms} from "./hal-forms";
import {Page} from "./page";
import {Resource} from "./resource";

export interface PaginatedModel<T extends Resource> extends HalForms {
  _embedded: {
    [key: string]: T[];
  };
  page: Page;
}


