import { FollowAction } from "@/actions/Follow/Follow.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import clsx from "clsx";
import { Plus, UserMinus } from "lucide-react";
import { useState } from "react";
// =======================================================
function PostAuthorFollowBtn({ post }: { post: PostType }) {
  const userSession = useUser();
  const [loading, setLoading] = useState(false);
  const [follow, setFollow] = useState(
    !!userSession.followings.find((user) => user.followingId === post.authorId),
  );
  const { setToast } = useToast();
  const handleFollow = async () => {
    try {
      setLoading(true);
      const result = await FollowAction(post.authorId);
      if (!result.success)
        return setToast({
          open: true,
          message: result.message || "حدث خطأ أثناء المتابعة.",
          type: "error",
        });
      setFollow(!follow);
      if (result.message)
        setToast({ open: true, message: result.message, type: "success" });
    } catch (error) {
      console.error(error);
      setToast({
        open: true,
        message: "حدث خطأ أثناء المتابعة.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleFollow}
      disabled={loading}
      className={clsx(
        "shadow flex items-center gap-1 mytransition active:scale-98 cursor-pointer text-[12px] disabled:cursor-default py-1 px-2 rounded ",
        follow
          ? "bg-white/10 not-disabled:hover:bg-white/15"
          : "bg-gray-200 hover:bg-gray-300 text-blue-700 ",
      )}
    >
      {follow ? (
        <>
          <UserMinus className="size-4" strokeWidth={1.5} />
          إلغاء المتابعة
        </>
      ) : (
        <>
          <Plus className="size-4" strokeWidth={1.5} />
          متابعة
        </>
      )}
    </button>
  );
}

export default PostAuthorFollowBtn;
