import ImagePreviewModal from "@/components/ImagePreviewModal/ImagePreviewModal";
import { StoryType } from "@/types/StoryType";
import Image from "next/image";
import { useState } from "react";
// ================================================
function StoryImage({ story }: { story: StoryType }) {
  const [showImage, setShowImage] = useState({ open: false, url: "" });
  return (
    <>
      {story.media && story.mediaType === "IMAGE" && (
        <button
          onClick={() =>
            setShowImage({ open: true, url: story.media as string })
          }
          className="w-full h-full relative cursor-pointer"
        >
          <Image src={story.media} alt="حاله" fill className="object-cover" />
        </button>
      )}
      {showImage.open && (
        <ImagePreviewModal showImage={showImage} setShowImage={setShowImage} />
      )}
    </>
  );
}

export default StoryImage;
