import CustomImageIcon from "@/components/CustomIcons/CustomImageIcon";
import Label from "./Label";
import { UseFieldArrayAppend } from "react-hook-form";
import z from "zod";
import { CreateMessageSchema } from "@/ZodSchemas/Message/CreateMessage.schema";
import handleFileUploadChatActions from "@/lib/helpers/handleFileUploadChatActions";
// ====================================================================
function UploadImage({
  fields,
  append,
}: {
  fields: ({
    mediaType: "IMAGE" | "VIDEO" | "PDF";
    mediaUrl: string;
    file: z.core.File;
  } & Record<"id", string>)[];
  append: UseFieldArrayAppend<z.infer<typeof CreateMessageSchema>, "media">;
}) {
  return (
    <div>
      <Label htmlFor="upload_image" icon={CustomImageIcon} text="الصور" />
      <input
        onChange={(e) => handleFileUploadChatActions(e, fields, append)}
        id="upload_image"
        type="file"
        accept="image/*"
        hidden
      />
    </div>
  );
}

export default UploadImage;
