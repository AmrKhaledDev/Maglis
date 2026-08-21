import CommentComposer from "./CommentComposer/CommentComposer";
import { useState } from "react";
import { Comment } from "@prisma/client";
import "dayjs/locale/ar";
import SingleComment from "./SingleComment/SingleComment";
import { PostType } from "@/types/Post.type";
import { useQuery } from "@tanstack/react-query";
import { GetPostCommentsAction } from "@/actions/Comment/GetPostComments.action";
import { useToast } from "@/providers/ToastProvider";
import CommentsSkeleton from "./CommentsSkeleton";
import { useUser } from "@/providers/UserProvider";
// ==================================================================
function Comments({ post }: { post: PostType }) {
  const { setToast } = useToast();
  const userSession = useUser();
  const { data: comments, isPending } = useQuery({
    queryFn: async () => {
      const result = await GetPostCommentsAction(post.id);
      if (!result.success)
        return setToast({
          open: true,
          message: result.message || "حدث خطأ أثناء جلب تعليقات المنشور.",
          type: "error",
        });
      return result.comments || [];
    },
    queryKey: ["comments", userSession.id],
  });
  const [showMoreComments, setShowMoreComments] = useState(false);
  const sortedComments = comments
    ? comments.sort((a, b) => {
        const aIsAuthor = a.userId === post.authorId;
        const bIsAuthor = b.userId === post.authorId;
        if (aIsAuthor && !bIsAuthor) return -1;
        if (!aIsAuthor && bIsAuthor) return 1;
        return 0;
      })
    : [];
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
          التعليقات <span>({sortedComments.length})</span>
        </p>
        {isPending ? (
          <CommentsSkeleton />
        ) : (
          sortedComments.map((comment) => (
            <SingleComment
              key={comment.id}
              setCurrentComment={setCurrentComment}
              comment={comment}
              post={post}
            />
          ))
        )}
        {sortedComments.length > 3 && (
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
