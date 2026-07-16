import { SavePostAction } from "@/actions/SavePost/SavePost.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostDBType } from "@/types/PostDB.type";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// =====================================
function OptionsSavePostBtn({ post }: { post: PostDBType }) {
  const [loading, setLoading] = useState(false);
  const { setToast } = useToast();
  const router = useRouter();
  const handleSavePost = async () => {
    try {
      setLoading(true);
      const result = await SavePostAction(post.id);
      if (!result.success)
        return setToast({
          open: true,
          message: result.message,
          type: "error",
        });
      router.refresh();
      setToast({
        type: "success",
        open: true,
        message: result.message,
      });
    } catch (error) {
      console.error(error);
      setToast({
        message: "حدث خطأ أثناء إنشاء منشورك حاول مرة أخرى",
        type: "error",
        open: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const user = useUser();
  const isSaved = user.savedPosts.some((item) => item.postId == post.id);
  console.log(isSaved);
  return (
    <button
      onClick={handleSavePost}
      disabled={loading}
      className={`postBtnAct ${isSaved ? "text-green-600" : ""}`}
    >
      <Save className="postBtnActIcon" /> {isSaved ? "محفوظ" : "حفظ"}
    </button>
  );
}

export default OptionsSavePostBtn;
