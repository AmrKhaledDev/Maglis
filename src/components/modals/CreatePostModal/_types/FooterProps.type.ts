import { UseFieldArrayAppend } from "react-hook-form";
import { FormType } from "./Form.type";
import FieldType from "./Field.type";
import { RefObject } from "react";
// ============================================================================
export type FooterPropsType = {
  fields: (FieldType &
    Record<"id", string> & {
      disabled?: boolean;
    })[];
  append: UseFieldArrayAppend<FormType, "media">;
  loading: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
};
