"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { UseFieldArrayRemove } from "react-hook-form";
import { useState } from "react";
import MediaPreviewModal from "@/components/MediaPreviewModal/MediaPreviewModal";
// ========================================================
function CreatePostModalMedia({
  media,
  remove,
  disabled,
}: {
  media: { preview: string; file: File; type: "video" | "image" }[];
  remove: UseFieldArrayRemove;
  disabled: boolean;
}) {
  const [showMedia, setShowMedia] = useState({
    preview: "",
    open: false,
  });
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
                  onClick={() =>
                    setShowMedia({ preview: item.preview, open: true })
                  }
                />
              ) : (
                <video
                  src={item.preview}
                  controls
                  className="size-20 cursor-pointer media"
                />
              )}
              <button
                disabled={disabled}
                type="button"
                onClick={() => {
                  URL.revokeObjectURL(item.preview);
                  remove(i);
                }}
                className="absolute top-1 left-1 disabled:hdden"
              >
                <X className="size-4 cursor-pointer text-white" />
              </button>
              {showMedia.open && showMedia.preview && (
                <MediaPreviewModal
                  showMedia={showMedia}
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

export default CreatePostModalMedia;
