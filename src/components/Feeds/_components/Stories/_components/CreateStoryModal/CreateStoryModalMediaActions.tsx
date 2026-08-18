import ImagePreviewModal from "@/components/ImagePreviewModal/ImagePreviewModal";
import { MediaType } from "@prisma/client";
import { Fullscreen, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
// ====================================================================
function StoryModalMediaActions({
  setMediaFile,
  setMediaPreview,
  mediaPreview,
  mediaType,
}: {
  setMediaFile: Dispatch<SetStateAction<File | null>>;
  setMediaPreview: Dispatch<SetStateAction<string>>;
  mediaPreview: string;
  mediaType: MediaType | "UNKNOWN";
}) {
  const [showImage, setShowImage] = useState({
    open: false,
    url: "",
  });
  return (
    <>
      {mediaPreview && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMediaPreview("");
              setMediaFile(null);
            }}
            className="flex hover:outline outline-red-700 active:scale-95 outline-offset-2 items-center gap-1 py-1.5 px-4 rounded-lg shadow bg-red-700 cursor-pointer font-semibold text-xs"
          >
            <Trash2 className="size-4" /> حذف
          </button>
          {mediaType === "IMAGE" && (
            <button
              onClick={() => setShowImage({ open: true, url: mediaPreview })}
              className="flex hover:outline outline-blue-700 active:scale-95 outline-offset-2 items-center gap-1 py-1.5 px-4 rounded-lg shadow bg-blue-700 cursor-pointer font-semibold text-xs"
            >
              <Fullscreen className="size-4" /> عرض
            </button>
          )}
        </div>
      )}
      {showImage.open && (
        <ImagePreviewModal showImage={showImage} setShowImage={setShowImage} />
      )}
    </>
  );
}

export default StoryModalMediaActions;
