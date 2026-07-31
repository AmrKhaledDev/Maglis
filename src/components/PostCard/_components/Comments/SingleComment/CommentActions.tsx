import { CreateLikeForComentAction } from "@/actions/LikeForComment/CreateLikeForComment.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { Heart, MessageCircleReply } from "lucide-react";
import { CommentDbType } from "../../../../../types/Comment.type";
import { useRepliesState } from "@/providers/RepliesStateProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// =======================================================
function CommentActions({ comment }: { comment: CommentDbType }) {
  const queryClient = useQueryClient();
  const { setShowReplyComposer } = useRepliesState();
  const user = useUser();
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
          queryKey: ["user_posts"],
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
    (like) => like.userId === user.id,
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
          className={`postBtnActIcon disabled:cursor-default ${isLikerForComment && "fill-red-500 text-red-500"}`}
        />
      </button>
      <button
        onClick={() =>
          setShowReplyComposer((prev) =>
            prev === comment.id ? "" : comment.id,
          )
        }
        disabled={loading}
        className="not-disabled:cursor-pointer"
      >
        <MessageCircleReply strokeWidth={1.5} className="postBtnActIcon" />
      </button>
    </div>
  );
}

export default CommentActions;
