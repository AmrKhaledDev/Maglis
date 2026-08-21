import { DeletePostAction } from "@/actions/Post/DeletePost.action";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
// ==============================================
function DeletePostBtn({ post }: { post: PostType }) {
  const userSession = useUser();
  const { setActiveMenu } = useActiveMenu();
  const router = useRouter();
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: handleDeletePost, isPending: loading } = useMutation({
    mutationFn: async () => {
      const result = await DeletePostAction(post.id);
      if (!result.success)
        throw new Error(
          result.message ?? "حدث خطأ أثناء حذف المنشور حاول مرة أخرى.",
        );
    },
    onSuccess: () => {
      setActiveMenu("");
      router.refresh();
      queryClient.invalidateQueries({
        queryKey: ["user_posts", userSession.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_postsVideos", userSession.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_postsPhotos", userSession.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_savedPosts", userSession.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts", userSession.id],
      });
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
      className="postBtnOpt text-red-700 hover:text-red-700!"
    >
      <Trash2 className="postBtnOptIcon" /> حذف
    </button>
  );
}

export default DeletePostBtn;
