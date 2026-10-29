import { UseFieldArrayAppend } from "react-hook-form";
import { Form } from "./Form.type";
import { RefObject } from "react";
import { Field } from "./Field.type";
// ============================================================================
export type FooterProps = {
  fields: (Field &
    Record<"id", string> & {
      disabled?: boolean;
    })[];
  append: UseFieldArrayAppend<Form, "media">;
  loading: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
};
