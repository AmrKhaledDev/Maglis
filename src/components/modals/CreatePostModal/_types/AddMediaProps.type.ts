import { UseFieldArrayAppend } from "react-hook-form";
import { Form } from "./Form.type";
// ======================================================
export type AddMediaProps = {
  append: UseFieldArrayAppend<Form, "media">;
  fields: ({
    preview: string;
    file: File | null;
  } & Record<"id", string> & {
      disabled?: boolean;
    })[];
  disabled:boolean
};
