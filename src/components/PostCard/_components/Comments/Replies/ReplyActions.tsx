import { CreateLikeForComentAction } from "@/actions/LikeForComment/CreateLikeForComment.action";
import { formatLikes } from "@/formats/formatLikes";
import { formatReplies } from "@/formats/formatReplies";
import { useRepliesState } from "@/providers/RepliesStateProvider";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { CommentType } from "@/types/Comment.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, MessageCircleReply } from "lucide-react";
// ==========================================================================
function ReplyActions({ reply }: { reply: CommentType }) {
  const { setShowReplyComposer } = useRepliesState();
  const user = useUser();
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
        queryKey: ["replies", reply.parentId],
      });
    },
    onError: (err: Error) => {
      setToast({ type: "error", message: err.message, open: true });
    },
  });
  const isLiker = reply.likeForComments.some((like) => like.userId === user.id);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => handleCreateLike()}
          disabled={loading}
          className="cursor-pointer"
        >
          <Heart
            strokeWidth={1.5}
            className={`size-3.5 disabled:cursor-default ${isLiker && "fill-red-500 text-red-500"}`}
          />
        </button>
        <button
          onClick={() =>
            setShowReplyComposer((prev) => (prev === reply.id ? "" : reply.id))
          }
          className="not-disabled:cursor-pointer"
        >
          <MessageCircleReply strokeWidth={1.5} className="size-3.5" />
        </button>
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
