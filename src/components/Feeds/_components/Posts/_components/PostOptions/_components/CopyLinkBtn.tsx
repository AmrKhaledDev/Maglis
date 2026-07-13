import { useToast } from "@/providers/ToastProvider";
import { PostDBType } from "@/types/PostDBType";
import { Link2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
// ====================================================
function CopyLinkBtn({
  post,
  setShowOptions,
}: {
  post: PostDBType;
  setShowOptions: Dispatch<SetStateAction<string>>;
}) {
  const [loading, setLoading] = useState(false);
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
      });
    } catch {
      setToast({
        open: true,
        message: "تعذر نسخ الرابط، حاول مرة أخرى.",
        type: "error",
      });
    } finally {
      setLoading(false);
      setShowOptions("");
    }
  };
  return (
    <button disabled={loading} onClick={handleCopyLink} className="postBtnAct">
      <Link2 className="size-4.5" /> نسخ الرابط
    </button>
  );
}

export default CopyLinkBtn;
