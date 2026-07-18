import CommentAuthor from "./CommentAuthor";
import CommentContent from "./CommentContent";
import CommentActions from "./CommentActions";
import { Ellipsis } from "lucide-react";
import CommentComposer from "./CommentComposer";
import { PostDBType } from "@/types/PostDB.type";
import { useState } from "react";
// ===================================================================
function Comments({
  post,
}: {
  post: PostDBType;
}) {
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
  return (
    <div className="mt-5 flex flex-col gap-3">
      <CommentComposer post={post} />
      <div className="flex flex-col gap-3 mt-3">
        <p className="text-slate-300 flex items-center gap-1">
          التعليقات <span>({post.comments.length})</span>
        </p>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gray-800 p-3 rounded-xl shadow w-full flex flex-col gap-3"
          >
            <div className="flex justify-between">
              <CommentAuthor user={comment.user} post={post} />
              <button className="cursor-pointer text-slate-300 h-fit">
                <Ellipsis className="size-4" strokeWidth={1.5} />
              </button>
            </div>
            <CommentContent comment={comment} />
            <hr className="border-white opacity-3" />
            <div className="flex items-center justify-between">
              <CommentActions />
              <div className="flex items-center gap-3">
                <p className="text-xs text-slate-300">10 إعجابات</p>
                <p className="text-xs text-slate-300">10 ردود</p>
              </div>
            </div>
          </div>
        ))}
        {post.comments.length > 3 && !showMoreComments && (
          <button
            onClick={() => setShowMoreComments(true)}
            className="text-xs w-fit mt-3 mx-auto hover:underline text-blue-500 cursor-pointer"
          >
            عرض المزيد من التعليقات
          </button>
        )}
      </div>
    </div>
  );
}

export default Comments;
