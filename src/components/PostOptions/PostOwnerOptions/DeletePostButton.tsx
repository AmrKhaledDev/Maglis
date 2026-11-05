import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { Post } from "@/types/post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
// ==============================================
function DeletePostButton({ post }: { post: Post }) {
  const userSession = useUser();
  const { setActiveMenu } = useActiveMenu();
  const router = useRouter();
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: handleDeletePost, isPending: loading } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axios.delete(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/delete/${post.id}`,
          { withCredentials: true },
        );
        const { success, message } = data;
        if (!success)
          throw new Error(
            message ?? "حدث خطأ أثناء حذف المنشور حاول مرة أخرى.",
          );
      } catch (error) {
        console.error(error);
        if (error instanceof axios.AxiosError)
          throw new Error(error.response?.data.message);
        throw new Error("حدث خطأ, تعذر حذف المنشور.");
      }
    },
    onSuccess: () => {
      setActiveMenu("");
      router.refresh();
      invalidateUserCaches(queryClient, userSession);
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
      onClick={() => handleDeletePost()}
      disabled={loading}
      className="btnOptBox text-red-700 hover:text-red-700!"
    >
      <Trash2 className="btnOptIcon" /> حذف
    </button>
  );
}

export default DeletePostButton;
