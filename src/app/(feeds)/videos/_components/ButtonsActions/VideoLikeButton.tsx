import { LikeAction } from "@/actions/Like/Like.action";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Heart } from "lucide-react";
// ====================================================================
function VideoLikeButton({
  video,
  isCommentsModalOpen,
}: {
  video: PostType;
  isCommentsModalOpen?: boolean;
}) {
  const { setToast } = useToast();
  const userSession = useUser();
  const queryClient = useQueryClient();
  const { mutate: handleLike, isPending: loading } = useMutation({
    mutationFn: async () => {
      const result = await LikeAction(video.id);
      if (!result.success)
        throw new Error(
          result.message ||
            "حدث خطأ، وتعذر تحديث حالة الإعجاب بهذا المنشور. يرجى المحاولة مرة أخرى.",
        );
    },
    onSuccess: () => {
      invalidateUserCaches(queryClient, userSession);
    },
    onError: (err: Error) => {
      setToast({
        open: true,
        message: err.message,
        type: "error",
      });
    },
  });
  const isLiker = video.likes.some((like) => like.userId === userSession.id);
  return (
    <button
      disabled={loading}
      onClick={() => handleLike()}
      className="videoBtnActionStyle"
    >
      <Heart
        className={clsx(
          isLiker && "fill-red-500 text-red-500",
          isCommentsModalOpen ? "size-5.5" : "size-7",
        )}
      />
    </button>
  );
}

export default VideoLikeButton;
