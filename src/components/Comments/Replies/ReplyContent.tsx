import { CommentType } from "@/types/Comment.type";
import Linkify from "linkify-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
// =======================================================
function ReplyContent({
  reply,
  setShowImage,
}: {
  reply: CommentType;
  setShowImage: Dispatch<SetStateAction<{ open: boolean; url: string }>>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Linkify
        options={{
          target: "_blank",
          attributes: {
            className: "text-sky-500 hover:underline ",
          },
        }}
      >
        <p dir="auto" className="text-[11px]">
          {reply.content}
        </p>
      </Linkify>
      {reply.image && (
        <button
          onClick={() =>
            setShowImage({
              open: true,
              url: reply.image as string,
            })
          }
          className="relative size-25 cursor-pointer rounded-md overflow-hidden group"
        >
          <Image
            src={reply.image}
            alt="صورة للرد"
            fill
            className="object-cover shrink-0"
          />
          <span className="inset-0 absolute bg-black/15 group-hover:opacity-0 mytransition" />
        </button>
      )}
    </div>
  );
}

export default ReplyContent;
