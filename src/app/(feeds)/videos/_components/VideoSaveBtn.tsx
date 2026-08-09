import { Bookmark } from "lucide-react";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { SavePostAction } from "@/actions/SavePost/SavePost.action";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostType } from "@/types/Post.type";
// =================================================================================
function VideoSaveBtn({ video }: { video: PostType }) {
  const router = useRouter();
  const { setToast } = useToast();
  const user = useUser();
  const queryClient = useQueryClient();
  const { mutate: handleSavePost, isPending: loading } = useMutation({
    mutationFn: async () => {
      const result = await SavePostAction(video.id);
      if (!result.success)
        throw new Error(result.message || "حدث خطأ أثناء حفظ هذا المنشور.");
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({
        queryKey: ["user_savedPosts", user.id],
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
  const isSaved = user.savedPosts.some((item) => item.postId === video.id);
  return (
    <button
      disabled={loading}
      onClick={() => handleSavePost()}
      className="videoBtnActionStyle"
    >
      <Bookmark
        className={clsx("size-7", isSaved && "fill-green-600 text-green-600")}
      />
    </button>
  );
}

export default VideoSaveBtn;
