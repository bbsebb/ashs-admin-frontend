import {Link} from "./link";

export type Links = {
  self: Link; // SHOULD
  [key: string]: Link | undefined;
}
