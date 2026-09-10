import { CreatePost_ModalFormType } from "@/components/Feeds/_components/CreatePostComposer/_types/CreatePost_ModalForm.type";
import { ChangeEvent } from "react";
import { UseFieldArrayAppend } from "react-hook-form";
// ========================================================================
const handleFileUploadCreatePost = (
  e: ChangeEvent<HTMLInputElement>,
  fields: ({
    preview: string;
    file: File;
  } & Record<"id", string> & {
      disabled?: boolean;
    })[],
  append: UseFieldArrayAppend<CreatePost_ModalFormType, "media">,
) => {
  if (fields.length >= 4) return;
  const file = e.target.files?.[0];
  if (file) {
    const url = URL.createObjectURL(file);
    const type = file.type.startsWith("video/")
      ? "video"
      : file.type.startsWith("image/")
        ? "image"
        : null;
    if (!type) return;
    append({
      file,
      preview: url,
      type: type,
    });
    e.target.value = "";
  }
};
export default handleFileUploadCreatePost;
