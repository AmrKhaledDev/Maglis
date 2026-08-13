import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { useToast } from "@/providers/ToastProvider";
import { CommentType } from "@/types/Comment.type";
import { Copy } from "lucide-react";
import { useState } from "react";
// ===================================================
function CopyContentBtn({ reply }: { reply: CommentType }) {
  const { setToast } = useToast();
  const [loading, setLoading] = useState(false);
  const { setActiveMenu } = useActiveMenu();
  const handleCopyContent = async () => {
    try {
      setLoading(true);
      await navigator.clipboard.writeText(reply.content || "");
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
      {reply.content && (
        <button
          onClick={handleCopyContent}
          disabled={loading}
          className="commentBtnAct"
        >
          <Copy className="size-4" /> نسخ النص
        </button>
      )}
    </>
  );
}

export default CopyContentBtn;
