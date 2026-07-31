import { LikeAction } from "@/actions/Like/Like.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostDBType } from "@/types/PostDB.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
// ===========================================
function LikeBtn({ post }: { post: PostDBType }) {
  const { setToast } = useToast();
  const user = useUser();
  const isLiker = post.likes.some((like) => like.userId === user.id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: handleLike, isPending: loading } = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("برجاء تسجيل الدخول أو التسجيل أولاً.");
      const result = await LikeAction(post.id);
      if (!result.success)
        throw new Error(
          result.message ||
            "حدث خطأ غير متوقع، وتعذر تحديث حالة الإعجاب بهذا المنشور. يرجى المحاولة مرة أخرى.",
        );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_posts"],
      });
      router.refresh();
    },
    onError: (error: Error) => {
      setToast({
        open: true,
        message: error.message,
        type: "error",
      });
    },
  });

  return (
    <button
      onClick={() => handleLike()}
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
