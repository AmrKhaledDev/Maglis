"use client";
import Image from "next/image";
import { MediaPreviewPropsType } from "./_types/MediaPreviewPropsType";
import MediaPreview_Actions from "./_components/MediaPreview_Actions";
// ==================================================================================
function MediaPreview({
  media,
  mediaFile,
  setMedia,
  setMediaFile,
}: MediaPreviewPropsType) {
  const mediaType = mediaFile
    ? mediaFile.type.startsWith("video")
      ? "video"
      : "image"
    : "unknown";
  return (
    <div>
      {media && mediaFile && (
        <div className="flex flex-col gap-3">
          <div className="w-full flex items-center justify-center max-h-125 overflow-hidden">
            {mediaType == "video" ? (
              <video src={media} className="size-full rounded-md" controls />
            ) : (
              <Image
                src={media}
                alt="media"
                width={200}
                height={200}
                className="object-contain min-w-70 rounded-md"
              />
            )}
          </div>
          <MediaPreview_Actions
            setMedia={setMedia}
            setMediaFile={setMediaFile}
            mediaFile={mediaFile}
          />
        </div>
      )}
    </div>
  );
}

export default MediaPreview;
