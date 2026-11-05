import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { Post } from "@/types/post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
// =========================================================================
function LikeButton({ post }: { post: Post }) {
  const { setToast } = useToast();
  const userSession = useUser();
  const isLiker = post.likes.some((like) => like.userId === userSession.id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: handleLike, isPending: loading } = useMutation({
    mutationFn: async () => {
      try {
        if (!userSession)
          throw new Error("برجاء تسجيل الدخول أو التسجيل أولاً.");
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${post.id}/like`,
          {},
          { withCredentials: true },
        );
        const { success, message }: { success: boolean; message: string } =
          data;
        if (!success)
          throw new Error(
            message ||
              "حدث خطأ غير متوقع، وتعذر تحديث حالة الإعجاب بهذا المنشور. يرجى المحاولة مرة أخرى.",
          );
      } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data.message);
        }
        throw new Error("حدث خطأ, تعذر الإعجاب بهذا المنشور.");
      }
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
          className="size-5"
        />
      ) : (
        <Heart strokeWidth={1.5} className="size-5" />
      )}
    </button>
  );
}
export default LikeButton;
