import { PrivacyType } from "@/types/Privacy.type";
import FieldType from "./Field.type";
// =========================================================================
export type FormType = {
  media: FieldType[];
  content: string;
  privacy: PrivacyType;
  commentsDisabled: boolean;
  isPinnedToProfile: boolean;
};
