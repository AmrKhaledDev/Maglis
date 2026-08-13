import { DeleteCommentAction } from "@/actions/Comment/DeleteComment.action";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { CommentType } from "@/types/Comment.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
// ======================================================
function DeleteReplayBtn({ reply }: { reply: CommentType }) {
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const { setActiveMenu } = useActiveMenu();
  const userSession = useUser();
  const { mutate: handleDeleteReply, isPending } = useMutation({
    mutationFn: async () => {
      const result = await DeleteCommentAction(reply.id);
      if (!result.success)
        throw new Error(
          result.message || "حدث خطأ أثناء حذف التعليق الخاص بك.",
        );
    },
    onSuccess: () => {
      setActiveMenu("");
      queryClient.invalidateQueries({
        queryKey: ["replies"],
      });
    },
    onError: (err: Error) => {
      setToast({
        open: true,
        message: err.message,
        type: "error",
      });
    },
  });
  return (
    <>
      {userSession.id === reply.userId && (
        <>
          <hr className=" border-zinc-700 opacity-5" />
          <button
            onClick={() => handleDeleteReply()}
            disabled={isPending}
            className="commentBtnAct text-red-700"
          >
            <Trash2 className="size-4" /> حذف
          </button>
        </>
      )}
    </>
  );
}

export default DeleteReplayBtn;
