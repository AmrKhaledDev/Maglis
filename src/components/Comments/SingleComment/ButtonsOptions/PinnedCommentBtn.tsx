import { PinnedCommentAction } from "@/actions/Comment/PinnedComment.action";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { Comment, Post } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Pin } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ============================================
function PinnedCommentBtn({
  comment,
  loading,
  setLoading,
  post,
}: {
  comment: Comment;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  post: Post;
}) {
  const userSession = useUser();
  const { setToast } = useToast();
  const { setActiveMenu } = useActiveMenu();
  const queryClient = useQueryClient();
  const { mutate: handlePinnedComment } = useMutation({
    mutationFn: async () => {
      setLoading(true);
      const result = await PinnedCommentAction(comment.id);
      if (!result.success)
        return setToast({
          open: true,
          message: result.message || "حدث خطأ أثناء تثبيت التعليق.",
          type: "error",
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", userSession.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_posts", userSession.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["comments", userSession.id],
      });
      setLoading(false);
      setActiveMenu("");
    },
  });
  return (
    <>
      {userSession.id === post.authorId && (
        <button
          disabled={loading}
          onClick={() => handlePinnedComment()}
          className={clsx(
            "commentBtnAct",
            comment.isPinned && "text-emerald-600",
          )}
        >
          <Pin className={`size-4 ${comment.isPinned && "rotate-45"}`} />
          {comment.isPinned ? "مُثبت" : "تثبيت"}
        </button>
      )}
    </>
  );
}

export default PinnedCommentBtn;
