"use client";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { BsEmojiGrin } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import z from "zod";
import { UseFieldArrayAppend } from "react-hook-form";
import { CreateMessageSchema } from "../../../../../../ZodSchemas/Message/CreateMessage.schema";
import SelectedMediaPreview from "./SelectedMediaPreview";
import UploadFiles from "./UploadFiles";
// =================================================================
function FooterActions({
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
  const { setActiveMenu } = useActiveMenu();
  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        className="p-2 rounded-full shadow bg-white/5 text-gray-400 text-xl cursor-pointer"
      >
        <BsEmojiGrin />
      </button>
      <div className="relative">
        <button
          type="button"
          onClick={() => setActiveMenu("upload_files")}
          className="p-2 rounded-full shadow bg-white/5 text-gray-400 text-xl cursor-pointer btnActiveMenu"
        >
          <FiPlus />
        </button>
        <UploadFiles fields={fields} append={append} />
      </div>
      {fields.length > 0 && (
        <SelectedMediaPreview append={append} fields={fields} />
      )}
    </div>
  );
}

export default FooterActions;
