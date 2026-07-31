import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { useToast } from "@/providers/ToastProvider";
import { PostDBType } from "@/types/PostDB.type";
import { Link2 } from "lucide-react";
import { useState } from "react";
// ====================================================
function OptionsCopyLinkBtn({ post }: { post: PostDBType }) {
  const [loading, setLoading] = useState(false);
  const { setActiveMenu } = useActiveMenu();
  const { setToast } = useToast();
  const handleCopyLink = async () => {
    try {
      setLoading(true);

      await navigator.clipboard.writeText(
        `${window.location.origin}/posts/${post.id}`,
      );

      setToast({
        open: true,
        message: "تم نسخ الرابط إلى الحافظة.",
        type: "success",
        duration: 2000,
      });
    } catch {
      setToast({
        open: true,
        message: "تعذر نسخ الرابط، حاول مرة أخرى.",
        type: "error",
      });
    } finally {
      setLoading(false);
      setActiveMenu("");
    }
  };
  return (
    <button disabled={loading} onClick={handleCopyLink} className="postBtnAct">
      <Link2 className="postBtnActIcon" /> نسخ الرابط
    </button>
  );
}

export default OptionsCopyLinkBtn;
