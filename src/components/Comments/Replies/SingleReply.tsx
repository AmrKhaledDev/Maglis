import Image from "next/image";
import ReplyActions from "./ReplyActions";
import Replies from "./Replies";
import ReplyHeader from "./ReplyHeader";
import ReplyAuthor from "./ReplyAuthor";
import { useState } from "react";
import { PostType } from "@/types/Post.type";
import { CommentType } from "@/types/Comment.type";
import { Gem } from "lucide-react";
import ImagePreviewModal from "@/components/ImagePreviewModal/ImagePreviewModal";
import Linkify from "linkify-react";
// ================================================================================
function SingleReply({
  reply,
  post,
  topLevelComment,
}: {
  reply: CommentType;
  post: PostType;
  topLevelComment: CommentType;
}) {
  const [showImage, setShowImage] = useState({
    open: false,
    url: "",
  });
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="bg-white/3 p-3 ring ring-gray-50/10 rounded-xl shadow w-full mt-2 flex flex-col gap-3">
        {reply.isFeatured && (
          <p className="flex items-center gap-1 text-[11px] text-yellow-600">
            <Gem strokeWidth={1.5} className="size-3.5" /> رد مميز
          </p>
        )}
        <ReplyHeader reply={reply} topLevelComment={topLevelComment} />
        <ReplyAuthor post={post} reply={reply} />
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
        <hr className="border-white opacity-2" />
        <ReplyActions
          reply={reply}
          topLevelComment={topLevelComment}
          commentsIsDisabled={post.commentsDisabled}
        />
      </div>
      <Replies
        userOwnerCommentName={reply.user.name}
        comment={reply}
        initialRepliesCount={reply._count.replies}
        post={post}
        topLevelComment={topLevelComment}
      />
      {showImage.open && (
        <ImagePreviewModal showImage={showImage} setShowImage={setShowImage} />
      )}
    </div>
  );
}

export default SingleReply;
