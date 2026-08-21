import ImagePreviewModal from "@/components/ImagePreviewModal/ImagePreviewModal";
import { Comment } from "@prisma/client";
import Linkify from "linkify-react";
import Image from "next/image";
import { useState } from "react";
// ==================================
function CommentContent({ comment }: { comment: Comment }) {
  const [showImage, setShowImage] = useState({
    open: false,
    url: "",
  });
  return (
    <div className="flex flex-col gap-3">
      <Linkify
        options={{
          target: "_blank",
          attributes: {
            className: "text-sky-500 hover:underline ",
          },
        }}
      >
        <p dir="auto" className="text-[12px] whitespace-pre-line">
          {comment.content}
        </p>
      </Linkify>
      {comment.image && (
        <>
          <button
            onClick={() =>
              setShowImage({
                open: true,
                url: comment.image as string,
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
          {showImage.open && (
            <ImagePreviewModal
              showImage={showImage}
              setShowImage={setShowImage}
            />
          )}
        </>
      )}
    </div>
  );
}

export default CommentContent;
