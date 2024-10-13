import {Options} from "./options";

export type Property  = {
  name: string; // REQUIRED
  prompt?: string; // OPTIONAL
  readOnly?: boolean; // OPTIONAL
  regex?: string; // OPTIONAL
  required?: boolean; // OPTIONAL
  templated?: boolean; // OPTIONAL
  value?: string; // OPTIONAL
  cols?: number; // OPTIONAL
  max?: number; // OPTIONAL
  maxLength?: number; // OPTIONAL
  min?: number; // OPTIONAL
  minLength?: number; // OPTIONAL
  options?: Options; // OPTIONAL
  placeholder?: string; // OPTIONAL
  rows?: number; // OPTIONAL
  step?: number; // OPTIONAL
  type?: string; // OPTIONAL
}
