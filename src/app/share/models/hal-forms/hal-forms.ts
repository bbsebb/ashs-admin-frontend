import {Links} from "./links";
import {Templates} from "./templates";

export interface HalForms  {
  _links: Links; // MUST
  _templates: Templates; // MUST
}

// Example usage of the interface
/*
const exampleHalForm: HalForms = {
  _links: {
    self: {
      href: "http://api.example.org/rels/create"
    },
    create: {
      href: "http://api.example.org/rels/create"
    }
  },
  _templates: {
    default: {
      title: "Create",
      method: "POST",
      contentType: "application/json",
      properties: [
        {
          name: "title",
          required: true,
          value: "",
          prompt: "Title",
          regex: "",
          templated: false
        },
        {
          name: "completed",
          required: false,
          value: "false",
          prompt: "Completed",
          regex: ""
        }
      ]
    }
  }
};
*/
