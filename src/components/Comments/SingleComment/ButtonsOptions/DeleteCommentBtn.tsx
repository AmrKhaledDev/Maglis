import { DeleteCommentAction } from "@/actions/Comment/DeleteComment.action";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { Comment } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ===============================================
function DeleteCommentBtn({
  comment,
  loading,
  setLoading,
}: {
  comment: Comment;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const userSession = useUser();
  const { setToast } = useToast();
  const { setActiveMenu } = useActiveMenu();
  const queryClient = useQueryClient();
  const { mutate: handleDeleteComment } = useMutation({
    mutationFn: async () => {
      setLoading(true);
      const result = await DeleteCommentAction(comment.id);
      if (!result.success)
        return setToast({
          open: true,
          type: "error",
          message: result.message ?? "حدث خطأ ما عند حذف تعليقك.",
        });
    },
    onSuccess: () => {
      setActiveMenu("");
      setLoading(false);
      queryClient.invalidateQueries({
        queryKey: ["posts", userSession.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_posts", userSession.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["comments", userSession.id],
      });
    },
  });
  return (
    <>
      {userSession.id == comment.userId && (
        <>
          <hr className=" border-zinc-700 opacity-5" />
          <button
            disabled={loading}
            onClick={() => handleDeleteComment()}
            className="commentBtnAct"
          >
            <Trash2 className="size-4" /> حذف
          </button>
        </>
      )}
    </>
  );
}

export default DeleteCommentBtn;
