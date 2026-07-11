import { UseFieldArrayAppend } from "react-hook-form";
import { CreatePost_ModalFormType } from "./CreatePost_ModalFormType";
// ============================================================================
export type CreatePost_Modal_FooterType = {
  fields: ({
    preview: string;
    file: File;
    type: "video" | "image";
  } & Record<"id", string> & {
      disabled?: boolean;
    })[];
  append: UseFieldArrayAppend<CreatePost_ModalFormType, "media">;
  content: string;
  loading:boolean
};
