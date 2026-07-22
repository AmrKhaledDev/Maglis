import { PinnedCommentAction } from "@/actions/Comment/PinnedComment.action";
import { useToast } from "@/providers/ToastProvider";
import { Comment } from "@prisma/client";
import { Pin } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ============================================
function BtnPinnedComment({
  comment,
  loading,
  setLoading,
  setShowOptions,
}: {
  comment: Comment;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setShowOptions: Dispatch<SetStateAction<string>>;
}) {
  const { setToast } = useToast();
  const handlePinnedComment = async () => {
    try {
      setLoading(true);
      setShowOptions("");
      const result = await PinnedCommentAction(comment.id);
      if (!result.success)
        return setToast({
          open: true,
          message: result.message || "حدث خطأ أثناء تثبيت التعليق.",
          type: "error",
        });
    } catch (error) {
      console.error(error);
      setToast({
        open: true,
        message: "حدث خطأ أثناء تثبيت التعليق.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      disabled={loading}
      onClick={handlePinnedComment}
      className={`flex items-center gap-2 text-xs not-disabled:hover:bg-white mytransition not-disabled:cursor-pointer ${comment.isPinned && "text-emerald-600"}`}
    >
      <Pin className={`size-4 ${comment.isPinned && "rotate-45"}`} />{" "}
      {comment.isPinned ? "مُثبت" : "تثبيت"}
    </button>
  );
}

export default BtnPinnedComment;
