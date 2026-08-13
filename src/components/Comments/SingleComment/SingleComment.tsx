import CommentAuthor from "./CommentAuthor";
import CommentIsPinned from "./CommentIsPinned";
import CommentOptions from "./CommentOptions";
import { Dispatch, SetStateAction } from "react";
import { Comment } from "@prisma/client";
import CommentContent from "./CommentContent";
import CommentActions from "./CommentActions";
import { formatLikes } from "@/formats/formatLikes";
import Replies from "../Replies/Replies";
import { formatReplies } from "@/formats/formatReplies";
import { PostType } from "@/types/Post.type";
import { CommentType } from "@/types/Comment.type";
// ==================================================================
function SingleComment({
  post,
  comment,
  setCurrentComment,
}: {
  post: PostType;
  comment: CommentType;
  setCurrentComment: Dispatch<SetStateAction<Comment | null>>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-white/7 p-3 rounded-xl ring ring-gray-50/13 shadow w-full flex flex-col gap-3">
        <CommentIsPinned comment={comment} />
        <div className="flex justify-between">
          <CommentAuthor comment={comment} user={comment.user} post={post} />
          <CommentOptions
            comment={comment}
            setCurrentComment={setCurrentComment}
            postAuthorId={post.authorId}
          />
        </div>
        <CommentContent comment={comment} />
        <hr className="border-white opacity-3" />
        <div className="flex items-center justify-between">
          <CommentActions comment={comment} commentsIsDisabled={post.commentsDisabled}/>
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
          comment={comment}
          initialRepliesCount={comment._count.replies}
          post={post}
          topLevelComment={comment}
        />
      </div>
    </div>
  );
}

export default SingleComment;
