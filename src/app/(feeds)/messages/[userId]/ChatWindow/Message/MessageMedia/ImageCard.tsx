import ImagePreviewModal from "@/components/ImagePreviewModal/ImagePreviewModal";
import { MessageMedia } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
// =====================================================
function ImageCard({
  media,
  mediaLength,
}: {
  media: MessageMedia;
  mediaLength: number;
}) {
  const [showImage, setShowImage] = useState({
    open: false,
    url: "",
  });
  return (
    <>
      {media.mediaType === "IMAGE" && (
        <button
          onClick={() => setShowImage({ open: true, url: media.mediaUrl })}
          className={clsx(
            "relative rounded-md overflow-hidden cursor-pointer group/button",
            mediaLength > 1 ? "size-80" : "size-100",
          )}
        >
          <Image
            src={media.mediaUrl}
            alt="صورة"
            fill
            className="object-cover"
          />
          {showImage.open && (
            <ImagePreviewModal
              showImage={showImage}
              setShowImage={setShowImage}
            />
          )}
          <span className="absolute inset-0 bg-black/20 group-hover/button:opacity-0 mytransition" />
        </button>
      )}
    </>
  );
}

export default ImageCard;
