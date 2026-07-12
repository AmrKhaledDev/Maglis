import { UseFieldArrayAppend } from "react-hook-form";
import { CreatePost_ModalFormType } from "./CreatePost_ModalFormType";
// ======================================================
export type AddMediaPropsType = {
  append: UseFieldArrayAppend<CreatePost_ModalFormType, "media">;
  fields: ({
    preview: string;
    file: File;
  } & Record<"id", string> & {
      disabled?: boolean;
    })[];
  disabled:boolean
};
