import MediaPreviewModal from "@/components/MediaPreviewModal/MediaPreviewModal";
import { Comment } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
// ==================================
function CommentContent({ comment }: { comment: Comment }) {
  const [showMedia, setShowMedia] = useState({
    preview: "",
    open: false,
  });
  return (
    <div className="flex flex-col gap-3">
      <p dir="auto" className="text-[12px]">
        {comment.content}
      </p>
      {comment.image && (
        <>
          <button
            onClick={() =>
              setShowMedia({
                open: true,
                preview: comment.image as string,
              })
            }
            className="relative size-30 rounded overflow-hidden group cursor-pointer"
          >
            <Image
              src={comment.image}
              alt="صورة"
              fill
              className="z-10 object-cover"
            />
            <span className="absolute z-15 bg-black/30 inset-0 group-hover:bg-black/15 mytransition" />
          </button>
          {showMedia.open && showMedia.preview && (
            <MediaPreviewModal
              showMedia={showMedia}
              setShowMedia={setShowMedia}
            />
          )}
        </>
      )}
    </div>
  );
}

export default CommentContent;
