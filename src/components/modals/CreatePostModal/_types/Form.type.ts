import { Privacy } from "@/types/Privacy.type";
import { Field } from "./Field.type";
// =========================================================================
export type Form = {
  media: Field[];
  content: string;
  privacy: Privacy;
  commentsDisabled: boolean;
  isPinnedToProfile: boolean;
};
