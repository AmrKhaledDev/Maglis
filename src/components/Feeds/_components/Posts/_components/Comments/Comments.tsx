import CommentComposer from "./CommentComposer/CommentComposer";
import { PostDBType } from "@/types/PostDB.type";
import { useState } from "react";
import { Comment } from "@prisma/client";
import "dayjs/locale/ar";
import SingleComment from "./SingleComment/SingleComment";
// ==================================================================
function Comments({ post }: { post: PostDBType }) {
  const [showMoreComments, setShowMoreComments] = useState(false);
  const sortedComments = [...post.comments].sort((a, b) => {
    const aIsAuthor = a.userId === post.authorId;
    const bIsAuthor = b.userId === post.authorId;
    if (aIsAuthor && !bIsAuthor) return -1;
    if (!aIsAuthor && bIsAuthor) return 1;
    return 0;
  });
  const comments = showMoreComments
    ? sortedComments
    : sortedComments.slice(0, 3);
  const [currentComment, setCurrentComment] = useState<Comment | null>(null);
  return (
    <div className="mt-5 flex flex-col gap-3">
      <CommentComposer
        post={post}
        currentComment={currentComment}
        setCurrentComment={setCurrentComment}
      />
      <div className="flex flex-col gap-3 mt-3">
        <p className="text-slate-300 flex items-center gap-1">
          التعليقات <span>({post.comments.length})</span>
        </p>
        {comments.map((comment) => (
          <SingleComment
            key={comment.id}
            setCurrentComment={setCurrentComment}
            comment={comment}
            post={post}
          />
        ))}
        {post.comments.length > 3 && (
          <button
            onClick={() => setShowMoreComments(!showMoreComments)}
            className="text-xs w-fit mt-3 mx-auto hover:underline text-blue-500 cursor-pointer"
          >
            {showMoreComments ? "عرض تعليقات أقل" : "عرض المزيد من التعليقات"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Comments;
