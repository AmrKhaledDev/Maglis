import { UseFieldArrayAppend } from "react-hook-form";
import { FormType } from "./Form.type";
// ======================================================
export type AddMediaPropsType = {
  append: UseFieldArrayAppend<FormType, "media">;
  fields: ({
    preview: string;
    file: File | null;
  } & Record<"id", string> & {
      disabled?: boolean;
    })[];
  disabled:boolean
};
