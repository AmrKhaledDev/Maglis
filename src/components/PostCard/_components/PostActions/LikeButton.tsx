import { LikeAction } from "@/actions/Like/Like.action";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
// =========================================================================
function LikeButton({ post }: { post: PostType }) {
  const { setToast } = useToast();
  const userSession = useUser();
  const isLiker = post.likes.some((like) => like.userId === userSession.id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: handleLike, isPending: loading } = useMutation({
    mutationFn: async () => {
      if (!userSession) throw new Error("برجاء تسجيل الدخول أو التسجيل أولاً.");
      const result = await LikeAction(post.id);
      if (!result.success)
        throw new Error(
          result.message ||
            "حدث خطأ غير متوقع، وتعذر تحديث حالة الإعجاب بهذا المنشور. يرجى المحاولة مرة أخرى.",
        );
    },
    onSuccess: () => {
      invalidateUserCaches(queryClient, userSession, post.authorId);
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
      {isLiker ? (
        <motion.img
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          src="/heart.png"
          alt="heart"
          className="size-5.5"
        />
      ) : (
        <Heart strokeWidth={1} className="size-5.5" />
      )}
    </button>
  );
}
export default LikeButton;
