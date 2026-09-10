import handleFileUploadChatActions from "@/lib/helpers/handleFileUploadChatActions";
import { CreateMessageSchema } from "@/ZodSchemas/Message/CreateMessage.schema";
import clsx from "clsx";
import { Plus, SendHorizontal, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UseFieldArrayAppend } from "react-hook-form";
import z from "zod";
// =====================================================================
function SelectedMediaPreview({
  fields,
  append,
}: {
  fields: ({
    mediaType: "IMAGE" | "VIDEO" | "PDF";
    mediaUrl: string;
  } & Record<"id", string>)[];
  append: UseFieldArrayAppend<z.infer<typeof CreateMessageSchema>, "media">;
}) {
  const [currentMedia, setCurrentMedia] = useState({
    id: fields.at(-1)?.id || "",
    mediaUrl: fields.at(-1)?.mediaUrl || "",
    mediaType: fields.at(-1)?.mediaType || "",
  });
  useEffect(() => {
    const lastMedia = fields.at(-1);
    if (!lastMedia) return;
    setCurrentMedia({
      id: lastMedia.id,
      mediaUrl: lastMedia.mediaUrl,
      mediaType: lastMedia.mediaType,
    });
  }, [fields]);
  return (
    <div className="fixed justify-center inset-0 bg-[#161717] backdrop-blur-[10px] flex flex-col gap-5 z-100 pt-10 items-center">
      <button
        type="button"
        className="absolute top-5 left-5 cursor-pointer text-gray-300 hover:text-white"
      >
        <X strokeWidth={1.5} />
      </button>
      <button className="bg-[#88754f] p-3 rounded-full shadow cursor-pointer absolute top-5 right-5 w-fit">
        <SendHorizontal className="size-6" />
        <span className="absolute p-1 bg-white rounded-full shadow text-black shrink-0 size-6 text-sm -top-2 -right-1 flex items-center justify-center">
          {fields.length}
        </span>
      </button>
      <div className="relative size-120">
        <Image
          src={currentMedia.mediaUrl}
          alt=""
          fill
          className="object-contain"
        />
      </div>
      <input
        type="text"
        placeholder="أكتب رسالتك..."
        className="bg-zinc-800 w-160 py-3 px-4 rounded-md shadow outline-none"
      />
      <div className="flex items-center gap-3">
        {fields.map((field) => (
          <button
            type="button"
            onClick={() =>
              setCurrentMedia({
                id: field.id,
                mediaType: field.mediaType,
                mediaUrl: field.mediaUrl,
              })
            }
            key={field.id}
            className={clsx(
              "relative size-15 rounded-md overflow-hidden cursor-pointer",
              currentMedia.id === field.id &&
                "border-3 border-green-600 scale-115",
            )}
          >
            <Image src={field.mediaUrl} alt="" fill className="object-cover" />
          </button>
        ))}
        <label
          htmlFor={fields.length < 4 ? "upload_file" : ""}
          className={clsx(
            "size-15 border rounded-md flex items-center justify-center  shadow",
            fields.length < 4
              ? "cursor-pointer active:scale-90 bg-white/5 border-white/10 "
              : "bg-gray-500 border-transparent text-gray-600",
          )}
        >
          <Plus strokeWidth={1.5} className="size-5" />
        </label>
        <input
          onChange={(e) => {
            handleFileUploadChatActions(e, fields, append);
          }}
          id="upload_file"
          type="file"
          accept="image/*, video/*, .pdf"
          hidden
        />
      </div>
    </div>
  );
}

export default SelectedMediaPreview;
