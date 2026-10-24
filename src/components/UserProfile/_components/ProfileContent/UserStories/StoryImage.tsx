import ImagePreviewModal from "@/components/ImagePreviewModal/ImagePreviewModal";
import { Story } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
// ================================================
function StoryImage({ story }: { story: Story }) {
  const [showImage, setShowImage] = useState({ open: false, url: "" });
  return (
    <>
      {story.media && story.mediaType === "IMAGE" && (
        <button
          onClick={() =>
            setShowImage({ open: true, url: story.media as string })
          }
          className="w-full h-full relative cursor-pointer overflow-hidden"
        >
          <Image
            src={story.media}
            alt="صورة"
            fill
            className="object-cover hover:scale-105 mytransition"
          />
        </button>
      )}
      {showImage.open && (
        <ImagePreviewModal showImage={showImage} setShowImage={setShowImage} />
      )}
    </>
  );
}

export default StoryImage;
