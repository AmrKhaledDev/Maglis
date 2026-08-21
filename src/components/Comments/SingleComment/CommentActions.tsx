import { CreateLikeForComentAction } from "@/actions/LikeForComment/CreateLikeForComment.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { Heart, MessageCircleReply } from "lucide-react";
import { useRepliesState } from "@/providers/RepliesStateProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentType } from "@/types/Comment.type";
import clsx from "clsx";
// =======================================================
function CommentActions({
  comment,
  commentsIsDisabled,
}: {
  comment: CommentType;
  commentsIsDisabled: boolean;
}) {
  const queryClient = useQueryClient();
  const { setShowReplyComposer } = useRepliesState();
  const userSession = useUser();
  const { setToast } = useToast();
  const { mutate: handleCreateLikeForComment, isPending: loading } =
    useMutation({
      mutationFn: async () => {
        const result = await CreateLikeForComentAction(comment.id);
        if (!result.success)
          throw new Error(result.message || "حدث خطأ غير متوقع.");
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user_posts", userSession.id],
        });
         queryClient.invalidateQueries({
          queryKey: ["comments", userSession.id],
        });
      },
      onError: (error: Error) => {
        setToast({
          open: true,
          message: error.message,
          type: "error",
        });
      },
    });
  const isLikerForComment = comment.likeForComments.some(
    (like) => like.userId === userSession.id,
  );
  return (
    <div className="flex items-center gap-2">
      <button
        disabled={loading}
        onClick={() => handleCreateLikeForComment()}
        className="cursor-pointer"
      >
        <Heart
          strokeWidth={1.5}
          className={clsx(
            "postBtnOptIcon disabled:cursor-default",
            isLikerForComment && "fill-red-500 text-red-500",
          )}
        />
      </button>
      {!commentsIsDisabled && (
        <button
          onClick={() =>
            setShowReplyComposer((prev) =>
              prev === comment.id ? "" : comment.id,
            )
          }
          disabled={loading}
          className="not-disabled:cursor-pointer"
        >
          <MessageCircleReply strokeWidth={1.5} className="postBtnOptIcon" />
        </button>
      )}
    </div>
  );
}

export default CommentActions;
