import { DeleteCommentAction } from "@/actions/Comment/DeleteComment.action";
import { useToast } from "@/providers/ToastProvider";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ===============================================
function BtnDeleteComment({
  commentId,
  loading,
  setLoading,
  setShowOptions,
}: {
  commentId: string;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setShowOptions: Dispatch<SetStateAction<string>>;
}) {
  const { setToast } = useToast();
  const handleDeleteComment = async () => {
    try {
      setLoading(true);
      setShowOptions("");
      const result = await DeleteCommentAction(commentId);
      if (!result.success)
        return setToast({
          open: true,
          type: "error",
          message: result.message ?? "حدث خطأ ما عند حذف تعليقك.",
        });
    } catch (error) {
      console.error(error);
      return setToast({
        open: true,
        type: "error",
        message: "حدث خطأ ما عند حذف تعليقك.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      disabled={loading}
      onClick={handleDeleteComment}
      className="flex items-center gap-2 text-xs not-disabled:hover:bg-white mytransition not-disabled:cursor-pointer text-red-600"
    >
      <Trash2 className="size-4" /> حذف
    </button>
  );
}

export default BtnDeleteComment;
