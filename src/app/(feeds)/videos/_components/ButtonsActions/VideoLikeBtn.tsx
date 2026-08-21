import { LikeAction } from "@/actions/Like/Like.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import clsx from "clsx";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// ====================================================================
function VideoLikeBtn({
  video,
  isCommentsModalOpen,
}: {
  video: PostType;
  isCommentsModalOpen?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setToast } = useToast();
  const userSession = useUser();
  const handleLike = async () => {
    try {
      setLoading(true);
      const result = await LikeAction(video.id);
      if (!result.success)
        return setToast({
          open: true,
          message:
            result.message ||
            "حدث خطأ، وتعذر تحديث حالة الإعجاب بهذا المنشور. يرجى المحاولة مرة أخرى.",
          type: "error",
        });
      router.refresh();
    } catch (error) {
      console.error(error);
      setToast({
        open: true,
        message:
          "حدث خطأ، وتعذر تحديث حالة الإعجاب بهذا المنشور. يرجى المحاولة مرة أخرى.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const isLiker = video.likes.some((like) => like.userId === userSession.id);
  return (
    <button
      disabled={loading}
      onClick={handleLike}
      className="videoBtnActionStyle"
    >
      <Heart
        className={clsx( isLiker && "fill-red-500 text-red-500",isCommentsModalOpen?"size-5.5":"size-7")}
      />
    </button>
  );
}

export default VideoLikeBtn;
