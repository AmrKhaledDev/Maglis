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
            mediaLength > 1 ? "xl:size-80 md:size-58 sm:size-80 size-70" : "md:size-100 sm:size-80 size-70",
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
