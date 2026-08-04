import { DeletePostAction } from "@/actions/Post/DeletePost.action";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { useToast } from "@/providers/ToastProvider";
import { PostDBType } from "@/types/Post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
// ==============================================
function DeletePostBtn({ post }: { post: PostDBType }) {
  const { setActiveMenu } = useActiveMenu();
  const router = useRouter();
  const { setToast } = useToast();
  const queryCLient = useQueryClient();
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
      queryCLient.invalidateQueries({
        queryKey: ["user_posts"],
      });
      queryCLient.invalidateQueries({
        queryKey: ["user_postsVideos"],
      });
      queryCLient.invalidateQueries({
        queryKey: ["user_postsPhotos"],
      });
      queryCLient.invalidateQueries({
        queryKey: ["user_savedPosts"],
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
      className="postBtnAct text-red-600"
    >
      <Trash2 className="postBtnActIcon" /> حذف
    </button>
  );
}

export default DeletePostBtn;
