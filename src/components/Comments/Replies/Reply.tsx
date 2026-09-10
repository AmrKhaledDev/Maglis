import ReplyActions from "./ReplyActions";
import Replies from "./Replies";
import ReplyHeader from "./ReplyHeader";
import ReplyAuthor from "./ReplyAuthor";
import { useState } from "react";
import { PostType } from "@/types/Post.type";
import { CommentType } from "@/types/Comment.type";
import { Gem } from "lucide-react";
import ImagePreviewModal from "@/components/ImagePreviewModal/ImagePreviewModal";
import ReplyContent from "./ReplyContent";
// ================================================================================
function Reply({
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
          <p className="flex items-center rounded gap-1 text-[10px] text-[#A9A9A9] py-0.5 px-2 bg-[#3E3E3E] w-fit">
            <Gem className="size-3" /> رد مميز
          </p>
        )}
        <ReplyHeader reply={reply} topLevelComment={topLevelComment} />
        <ReplyAuthor post={post} reply={reply} />
        <ReplyContent reply={reply} setShowImage={setShowImage} />
        <hr className="border-white opacity-2" />
        <ReplyActions
          reply={reply}
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

export default Reply;
