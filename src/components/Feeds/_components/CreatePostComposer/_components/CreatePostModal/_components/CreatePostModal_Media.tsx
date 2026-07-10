"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { UseFieldArrayRemove } from "react-hook-form";
import ShowMediaUploaded from "./ShowMediaUploaded";
import { useState } from "react";
// ========================================================
function CreatePostModal_Media({
  media,
  remove,
}: {
  media: { preview: string; file: File; type: "video" | "image" }[];
  remove: UseFieldArrayRemove;
}) {
  const [showMedia, setShowMedia] = useState({
    mediaType: "",
    preview: "",
    open: false,
  });
  const handleShowMediaUploaded = (
    mediaType: "image" | "video",
    preview: string,
  ) => {
    setShowMedia({
      mediaType: mediaType,
      preview,
      open: true,
    });
  };
  return (
    <>
      {media.length > 0 && (
        <div className="flex items-center gap-2">
          {media.map((item, i) => (
            <div key={i} className="relative size-20 ">
              {item.type == "image" ? (
                <Image
                  src={item.preview}
                  alt="صورة للمنشور"
                  fill
                  className="rounded object-cover cursor-pointer media" 
                  onClick={() => {
                    handleShowMediaUploaded("image", item.preview);
                  }}
                />
              ) : (
                <video
                  onClick={() => {
                    handleShowMediaUploaded("video", item.preview);
                  }}
                  src={item.preview}
                  controls
                  className="size-20 cursor-pointer media"
                />
              )}
              <button
                type="button"
                onClick={() => {
                  URL.revokeObjectURL(item.preview);
                  remove(i);
                }}
                className="absolute top-1 left-1"
              >
                <X className="size-4 cursor-pointer text-white" />
              </button>
              {showMedia.open && (
                <ShowMediaUploaded
                  mediaType={showMedia.mediaType as "image" | "video"}
                  preview={showMedia.preview}
                  setShowMedia={setShowMedia}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default CreatePostModal_Media;
