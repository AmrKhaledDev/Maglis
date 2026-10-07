import { CreateMessageSchema } from "@/ZodSchemas/Message/CreateMessage.schema";
import { UseFieldArrayAppend } from "react-hook-form";
import z from "zod";
// ==========================================================
type UploadMediaPropsType = {
  fields: ({
    type: "IMAGE" | "VIDEO" | "PDF";
    url: string;
    file?: z.core.File | null | undefined;
  } & Record<"id", string>)[];
  append: UseFieldArrayAppend<z.infer<typeof CreateMessageSchema>, "media">;
};
export default UploadMediaPropsType;
