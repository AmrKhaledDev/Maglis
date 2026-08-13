import { ToggleFeaturedReplyAction } from "@/actions/Reply/ToggleFeaturedReply.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { CommentType } from "@/types/Comment.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Gem } from "lucide-react";
// ======================================================
function FeaturedReplyBtn({
  reply,
  commentId,
}: {
  reply: CommentType;
  commentId: string;
}) {
  const userSession = useUser();
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const result = await ToggleFeaturedReplyAction(reply.id);
      if (!result.success)
        throw new Error(
          result.message || "حدث خطأ غير متوقع أثناء جعل هذا الرد مميز.",
        );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_posts", userSession.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["replies", commentId],
      });
    },
    onError: (error: Error) => {
      setToast({
        open: true,
        type: "error",
        message: error.message,
      });
    },
  });
  return (
    <>
      {userSession.id !== reply.userId &&
        reply.post.authorId === userSession.id && (
          <button
            onClick={() => mutate()}
            disabled={isPending}
            className={clsx(
              "commentBtnAct",
              reply.isFeatured && "text-yellow-600",
            )}
          >
            <Gem strokeWidth={1.5} className="size-4" />
            {reply.isFeatured ? "مُميز" : " رد مميز"}
          </button>
        )}
    </>
  );
}

export default FeaturedReplyBtn;
