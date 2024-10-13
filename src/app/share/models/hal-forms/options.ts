import {LinkOptions} from "./link-options";
import {InlineOption} from "./inline-option";

export type Options = {
  selectedValues?: string[]; // OPTIONAL
  inline?: (string | InlineOption)[]; // OPTIONAL
  link?: LinkOptions; // OPTIONAL
  promptField?: string; // OPTIONAL
  valueField?: string; // OPTIONAL
  minItems?: number; // OPTIONAL
  maxItems?: number; // OPTIONAL
}
