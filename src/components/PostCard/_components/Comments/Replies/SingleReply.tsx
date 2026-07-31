import Image from "next/image";
import ReplyActions from "./ReplyActions";
import Replies from "./Replies";
import { CommentDbType } from "../../../../../types/Comment.type";
import { PostDBType } from "@/types/PostDB.type";
import ReplyHeader from "./ReplyHeader";
import ReplyAuthor from "./ReplyAuthor";
import { useState } from "react";
import MediaPreviewModal from "@/components/MediaPreviewModal/MediaPreviewModal";
// ================================================================================
function SingleReply({
  reply,
  post,
  topLevelComment,
}: {
  reply: CommentDbType;
  post: PostDBType;
  topLevelComment: CommentDbType;
}) {
  const [showMedia, setShowMedia] = useState({
    open: false,
    preview: "",
    mediaType: "image",
  });
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="bg-white/4 p-3 rounded-xl shadow w-full mt-2 flex flex-col gap-3">
        <ReplyHeader reply={reply} topLevelComment={topLevelComment} />
        <ReplyAuthor post={post} reply={reply} />
        <div className="flex flex-col gap-2">
          <p className="text-[11px]">{reply.content}</p>
          {reply.image && (
            <button
              onClick={() =>
                setShowMedia({
                  open: true,
                  preview: reply.image as string,
                  mediaType: "image",
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
        <ReplyActions reply={reply} />
      </div>
      <Replies
        userOwnerCommentName={reply.user.name}
        comment={reply}
        initialRepliesCount={reply._count.replies}
        post={post}
        topLevelComment={topLevelComment}
      />
      {showMedia.open && (
        <MediaPreviewModal showMedia={showMedia} setShowMedia={setShowMedia} />
      )}
    </div>
  );
}

export default SingleReply;
