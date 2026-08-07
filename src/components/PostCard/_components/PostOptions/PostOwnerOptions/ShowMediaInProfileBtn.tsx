import { ShowMediaInProfileAction } from "@/actions/Post/ShowMediaInProfile.action";
import { useToast } from "@/providers/ToastProvider";
import { PostDBType } from "@/types/Post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Images } from "lucide-react";
// ==========================================================================================
function ShowMediaInProfileBtn({ post }: { post: PostDBType }) {
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const result = await ShowMediaInProfileAction(post.id);
      if (!result.success) throw new Error(result.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_postsPhotos"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_postsVideos"],
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
      onClick={() => mutate()}
      disabled={isPending}
      className={clsx("postBtnAct", post.showMediaInProfile && "text-red-500")}
    >
      <Images className="postBtnActIcon" />
      {post.showMediaInProfile ? "إخفاء الوسائط" : "إظهار الوسائط"}
    </button>
  );
}

export default ShowMediaInProfileBtn;
