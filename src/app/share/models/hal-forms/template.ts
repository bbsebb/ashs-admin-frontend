import {Property} from "./property";

export type Template = {
  title?: string; // OPTIONAL
  method: string; // REQUIRED
  contentType?: string; // OPTIONAL
  properties?: Property[]; // OPTIONAL
  target?: string; // OPTIONAL
}
