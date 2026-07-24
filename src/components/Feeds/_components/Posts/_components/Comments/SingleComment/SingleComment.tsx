import CommentAuthor from "./CommentAuthor";
import CommentIsPinned from "./CommentIsPinned";
import { CommentDbType } from "@/types/Comment.type";
import CommentOptions from "./CommentOptions";
import { PostDBType } from "@/types/PostDB.type";
import { Dispatch, SetStateAction, useState } from "react";
import { Comment } from "@prisma/client";
import CommentContent from "./CommentContent";
import CommentActions from "./CommentActions";
import { formatLikes } from "@/formats/formatLikes";
import Replies from "../Replies/Replies";
import { formatReplies } from "@/formats/formatReplies";
// ==================================================================
function SingleComment({
  post,
  comment,
  setCurrentComment,
}: {
  post: PostDBType;
  comment: CommentDbType;
  setCurrentComment: Dispatch<SetStateAction<Comment | null>>;
}) {
  const [showReplyComposer, setShowReplyComposer] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-white/10 p-3 rounded-xl shadow w-full flex flex-col gap-3">
        <CommentIsPinned comment={comment} />
        <div className="flex justify-between">
          <CommentAuthor comment={comment} user={comment.user} post={post} />
          <CommentOptions
            comment={comment}
            setCurrentComment={setCurrentComment}
          />
        </div>
        <CommentContent comment={comment} />
        <hr className="border-white opacity-3" />
        <div className="flex items-center justify-between">
          <CommentActions
            comment={comment}
            setShowReplyComposer={setShowReplyComposer}
          />
          <div className="flex items-center gap-3">
            <p className="text-xs text-slate-300">
              {formatLikes(comment.likeForComments.length)}
            </p>
            <p className="text-xs text-slate-300">
              {formatReplies(comment._count.replies)}
            </p>
          </div>
        </div>
      </div>
      <div className="pr-5">
        <Replies
          userOwnerCommentName={comment.user.name}
          showReplyComposer={showReplyComposer}
          comment={comment}
          setShowReplyComposer={setShowReplyComposer}
          initialRepliesCount={comment._count.replies}
          post={post}
          topLevelComment={comment}
        />
      </div>
    </div>
  );
}

export default SingleComment;
