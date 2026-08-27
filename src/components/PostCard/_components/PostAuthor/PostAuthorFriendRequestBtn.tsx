import { FriendRequestAction } from "@/actions/FriendRequest/FriendRequest.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import clsx from "clsx";
import { Check, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// =======================================
function PostAuthorFriendRequestBtn({ post }: { post: PostType }) {
  const userSession = useUser();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(
    !!userSession.sender.find((user) => user.receiverId === post.authorId),
  );
  const router = useRouter();
  const { setToast } = useToast();
  const handleFrientRequest = async () => {
    try {
      setLoading(true);
      const result = await FriendRequestAction(post.authorId);
      if (!result.success)
        return setToast({
          open: true,
          message: result.message || "حدث خطأ أثناء إرسال طلب الصداقة.",
          type: "error",
        });
        setSent(!sent)
      if (result.message)
        setToast({ open: true, message: result.message, type: "success" });
    } catch (error) {
      console.error(error);
      setToast({
        open: true,
        message: "حدث خطأ أثناء إرسال طلب صداقه حاول مرة أخرى.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleFrientRequest}
      disabled={loading}
      className={clsx(
        "shadow text-[11px] flex items-center gap-1 mytransition active:scale-98 px-2 rounded cursor-pointer disabled:cursor-default py-1.5",
        sent
          ? "bg-white/5 text-xs not-disabled:hover:bg-white/10"
          : "not-disabled:hover:bg-blue-700/40  bg-blue-700/50",
      )}
    >
      {sent ? (
        <>
          <Check className="size-4" strokeWidth={1.5} />
          تم إرسال الطلب
        </>
      ) : (
        <>
          <UserPlus className="size-4" strokeWidth={1.5} />
          إضافة صديق
        </>
      )}
    </button>
  );
}

export default PostAuthorFriendRequestBtn;
