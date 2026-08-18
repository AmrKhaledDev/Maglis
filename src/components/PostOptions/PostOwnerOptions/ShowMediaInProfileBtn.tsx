import { ShowMediaInProfileAction } from "@/actions/Post/ShowMediaInProfile.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Images } from "lucide-react";
// ==========================================================================================
function ShowMediaInProfileBtn({ post }: { post: PostType }) {
  const { setToast } = useToast();
  const user = useUser();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const result = await ShowMediaInProfileAction(post.id);
      if (!result.success) throw new Error(result.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_posts", user.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_postsPhotos", user.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_postsVideos", user.id],
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
    <>
      {post.medias.length > 0 && (
        <button
          onClick={() => mutate()}
          disabled={isPending}
          className={clsx(
            "postBtnOpt",
            post.showMediaInProfile && "text-red-500",
          )}
        >
          <Images className="postBtnOptIcon" />
          {post.showMediaInProfile ? "إخفاء الوسائط" : "إظهار الوسائط"}
        </button>
      )}
    </>
  );
}

export default ShowMediaInProfileBtn;
