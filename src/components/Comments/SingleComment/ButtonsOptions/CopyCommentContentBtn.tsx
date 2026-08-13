import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { useToast } from "@/providers/ToastProvider";
import { Comment } from "@prisma/client";
import { Copy } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// =========================================
function CopyCommentContentBtn({
  comment,
  loading,
  setLoading,
}: {
  comment: Comment;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const { setToast } = useToast();
  const { setActiveMenu } = useActiveMenu();
  const handleCopyContent = async () => {
    try {
      setLoading(true);
      if(!comment.content) return
      await navigator.clipboard.writeText(comment.content);
      setToast({
        open: true,
        message: "تم نسخ المحتوى إلى الحافظة",
        duration: 2000,
        type: "success",
      });
      setActiveMenu("");
    } catch (error) {
      console.error(error);
      setToast({
        message: "حدث خطأ عند نسخ المحتوى.",
        open: true,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {comment.content && (
        <button
          disabled={loading}
          onClick={handleCopyContent}
          className="flex items-center gap-2 text-xs not-disabled:hover:bg-white mytransition not-disabled:cursor-pointer"
        >
          <Copy className="size-4" /> نسخ النص
        </button>
      )}
    </>
  );
}

export default CopyCommentContentBtn;
