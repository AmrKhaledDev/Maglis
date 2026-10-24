import { MediaType } from "@prisma/client";
import clsx from "clsx";
import { CloudDownload } from "lucide-react";
import Image from "next/image";
import { ChangeEvent } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ReactPlayer from "react-player";
import CreateStoryFormValues from "./_types/CreateStoryFormValues.type";
import MediaActions from "./MediaActions";
import MediaInfo from "./MediaInfo";
// ===================================================================
function UploadMedia() {
  const { setValue, control } = useFormContext<CreateStoryFormValues>();
  const [mediaFile, mediaPreview] = useWatch({
    control,
    name: ["file", "preview"],
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setValue("file", file);
      setValue("preview", url);
      e.target.value = "";
    }
  };
  const mediaType: MediaType | "UNKNOWN" = mediaFile
    ? mediaFile.type.startsWith("video/")
      ? "VIDEO"
      : "IMAGE"
    : "UNKNOWN";
  return (
    <div className="flex flex-col gap-3">
      <MediaInfo />
      <div
        className={clsx(
          "hover:bg-gray-900/80 mytransition rounded-lg bg-gray-900/50 border border-white/20 border-dashed relative overflow-hidden",
          mediaPreview ? "h-100" : "h-55",
        )}
      >
        {mediaPreview && mediaType ? (
          mediaType === "VIDEO" ? (
            <ReactPlayer
              src={mediaPreview}
              width="100%"
              height="100%"
              controls
              className="w-full h-full bg-black"
            />
          ) : (
            <Image
              src={mediaPreview}
              alt="صورة"
              fill
              className="object-contain"
            />
          )
        ) : (
          <label
            htmlFor="upload_StoryMedia"
            className="w-full cursor-pointer h-full flex flex-col gap-2 justify-center items-center"
          >
            <CloudDownload className="size-15 bg-blue-800/30 rounded-full text-blue-700 p-3" />
            <h2 className="text-xl font-semibold text-gray-200">
              اضغط للاختيار
            </h2>
            <p className="text-xs text-gray-400">
              صورة حتى - 10MB
              <br />
              فيديو حتى - 100MB
            </p>
          </label>
        )}
      </div>
      <input
        onChange={handleChange}
        accept="image/*, video/*"
        type="file"
        id="upload_StoryMedia"
        className="hidden"
        hidden
      />
      <MediaActions mediaPreview={mediaPreview} mediaType={mediaType} />
    </div>
  );
}

export default UploadMedia;
