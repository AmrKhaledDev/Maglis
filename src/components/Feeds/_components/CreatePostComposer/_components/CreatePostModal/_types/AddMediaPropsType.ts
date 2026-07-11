import { UseFieldArrayAppend } from "react-hook-form";
import { PostModalFormType } from "./CreatePost_ModalFormType";
// ======================================================
export type AddMediaPropsType = {
  append: UseFieldArrayAppend<PostModalFormType, "media">;
  fields: ({
    preview: string;
    file: File;
  } & Record<"id", string> & {
      disabled?: boolean;
    })[];
};
