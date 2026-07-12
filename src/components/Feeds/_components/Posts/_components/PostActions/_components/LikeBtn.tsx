import { LikeAction } from "@/actions/Like/Like.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostDBType } from "@/types/PostDBType";
import { Heart, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// ===========================================
function LikeBtn({ post }: { post: PostDBType }) {
  const [loading, setLoading] = useState(false);
  const { setToast } = useToast();
  const router = useRouter();
  const handleLike = async () => {
    try {
      setLoading(true);
      const result = await LikeAction(post.id);
      if (!result.success)
        return setToast({
          message:
            result.message ??
            "حدث خطأ غير متوقع، وتعذر تحديث حالة الإعجاب بهذا المنشور. يرجى المحاولة مرة أخرى.",
          type: "error",
          open: true,
        });
      router.refresh();
    } catch (error) {
      console.error(error);
      setToast({
        message:
          "حدث خطأ غير متوقع، وتعذر تحديث حالة الإعجاب بهذا المنشور. يرجى المحاولة مرة أخرى.",
        type: "error",
        open: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const user = useUser();
  const isLiker = post.likes.some((like) => like.userId === user.id);
  return (
    <button
      onClick={handleLike}
      disabled={loading}
      className="not-disabled:cursor-pointer flex items-center gap-1 text-gray-100"
    >
      <Heart
        strokeWidth={1}
        className={`size-5 ${isLiker && "fill-red-500 text-red-500"}`}
      />
    </button>
  );
}
export default LikeBtn;
