import { PinnedCommentAction } from "@/actions/Comment/PinnedComment.action";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { Comment } from "@prisma/client";
import { Pin } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ============================================
function PinnedCommentBtn({
  comment,
  loading,
  setLoading,
  postAuthorId,
}: {
  comment: Comment;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  postAuthorId: string;
}) {
  const userSession = useUser();
  const { setToast } = useToast();
  const { setActiveMenu } = useActiveMenu();
  const handlePinnedComment = async () => {
    try {
      setLoading(true);
      setActiveMenu("");
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
    <>
      {userSession.id === postAuthorId && (
        <button
          disabled={loading}
          onClick={handlePinnedComment}
          className={`flex items-center gap-2 text-xs not-disabled:hover:bg-white mytransition not-disabled:cursor-pointer ${comment.isPinned && "text-emerald-600"}`}
        >
          <Pin className={`size-4 ${comment.isPinned && "rotate-45"}`} />{" "}
          {comment.isPinned ? "مُثبت" : "تثبيت"}
        </button>
      )}
    </>
  );
}

export default PinnedCommentBtn;
