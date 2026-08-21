import { CreateLikeForComentAction } from "@/actions/LikeForComment/CreateLikeForComment.action";
import { formatLikes } from "@/formats/formatLikes";
import { formatReplies } from "@/formats/formatReplies";
import { useRepliesState } from "@/providers/RepliesStateProvider";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { CommentType } from "@/types/Comment.type";
import { Comment } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, MessageCircleReply } from "lucide-react";
// ==========================================================================
function ReplyActions({
  reply,
  commentsIsDisabled,
  topLevelComment
}: {
  reply: CommentType;
  commentsIsDisabled: boolean;
  topLevelComment:Comment
}) {
  const { setShowReplyComposer } = useRepliesState();
  const userSession = useUser();
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: handleCreateLike, isPending: loading } = useMutation({
    mutationFn: async () => {
      const result = await CreateLikeForComentAction(reply.id);
      if (!result.success) {
        throw new Error(result.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["replies", topLevelComment.id,userSession.id],
      });
    },
    onError: (err: Error) => {
      setToast({ type: "error", message: err.message, open: true });
    },
  });
  const isLiker = reply.likeForComments.some(
    (like) => like.userId === userSession.id,
  );
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => handleCreateLike()}
          disabled={loading}
          className="cursor-pointer"
        >
          <Heart
            strokeWidth={1.5}
            className={`size-3.5 disabled:cursor-default ${isLiker && "fill-red-500 text-red-500"}`}
          />
        </button>
        {!commentsIsDisabled && (
          <button
            onClick={() =>
              setShowReplyComposer((prev) =>
                prev === reply.id ? "" : reply.id,
              )
            }
            className="not-disabled:cursor-pointer"
          >
            <MessageCircleReply strokeWidth={1.5} className="size-3.5" />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <p className="text-[10px] text-slate-300">
          {formatLikes(reply.likeForComments.length)}
        </p>
        <p className="text-[10px] text-slate-300">
          {formatReplies(reply._count.replies)}
        </p>
      </div>
    </div>
  );
}

export default ReplyActions;
