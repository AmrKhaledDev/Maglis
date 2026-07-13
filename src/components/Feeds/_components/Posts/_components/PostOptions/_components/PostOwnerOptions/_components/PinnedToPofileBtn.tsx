import { UpdatePostSettingsAction } from "@/actions/Post/Edit/UpdatePostSettings.action";
import { useToast } from "@/providers/ToastProvider";
import { PostDBType } from "@/types/PostDBType";
import { Pin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// =====================================================================================
function PinnedToPofileBtn({ post }: { post: PostDBType }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setToast } = useToast();
  const handlePinnedToProfile = async () => {
    try {
      setLoading(true);
      const result = await UpdatePostSettingsAction("PINNED", post.id);
      if (!result.success)
        return setToast({
          type: "error",
          message: result.message,
          open: true,
        });
      router.refresh();
    } catch (error) {
      console.error(error);
      setToast({
        type: "error",
        message: "",
        open: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handlePinnedToProfile}
      disabled={loading}
      className={`postBtnAct ${post.isPinnedToProfile && "text-amber-500"}`}
    >
      <Pin className={`postBtnActIcon ${post.isPinnedToProfile && "rotate-45"}`} />
      {post.isPinnedToProfile
        ? "إلغاء التثبيت من الملف الشخصي"
        : "تثبيت في الملف الشخصي"}
    </button>
  );
}

export default PinnedToPofileBtn;
