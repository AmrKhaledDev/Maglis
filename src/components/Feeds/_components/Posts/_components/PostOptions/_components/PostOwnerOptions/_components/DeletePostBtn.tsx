import { DeletePostAction } from "@/actions/Post/Delete/DeletePost.action";
import { useToast } from "@/providers/ToastProvider";
import { PostDBType } from "@/types/PostDBType";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
// ==============================================
function DeletePostBtn({
  post,
  setShowOptions,
}: {
  post: PostDBType;
  setShowOptions: Dispatch<SetStateAction<string>>;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setToast } = useToast();
  const handleDeletePost = async () => {
    try {
      setLoading(true);
      const result = await DeletePostAction(post.id);
      if (!result.success)
        return setToast({
          message: result.message ?? "حدث خطأ أثناء حذف المنشور حاول مرة أخرى.",
          type: "error",
          open: true,
        });
      setShowOptions("");
      router.refresh();
    } catch (error) {
      console.error(error);
      setToast({
        message: "حدث خطأ أثناء حذف المنشور حاول مرة أخرى.",
        type: "error",
        open: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleDeletePost}
      disabled={loading}
      className="postBtnAct text-red-600"
    >
      <Trash2 className="postBtnActIcon" /> حذف
    </button>
  );
}

export default DeletePostBtn;
