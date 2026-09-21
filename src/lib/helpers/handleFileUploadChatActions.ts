import { CreateMessageSchema } from "@/ZodSchemas/Message/CreateMessage.schema";
import { ChangeEvent } from "react";
import { UseFieldArrayAppend } from "react-hook-form";
import z from "zod";
// =====================================
const handleFileUploadChatActions = (
  e: ChangeEvent<HTMLInputElement>,
  fields: ({
    type: "IMAGE" | "VIDEO" | "PDF";
    url: string;
  } & Record<"id", string>)[],
  append: UseFieldArrayAppend<z.infer<typeof CreateMessageSchema>, "media">,
) => {
  if (fields.length >= 4) return;
  const file = e.target.files?.[0];
  if (file) {
    const url = URL.createObjectURL(file);
    const type = file.type.startsWith("video/")
      ? "video"
      : file.type.startsWith("image/")
        ? "image"
        : file.type === "application/pdf"
          ? "pdf"
          : null;
    if (!type) return;
    append({
      file,
      url: url,
      type: type.toUpperCase() as "IMAGE" | "VIDEO" | "PDF",
      size: file.size,
      name: file.name,
    });
    e.target.value = "";
  }
};
export default handleFileUploadChatActions;
