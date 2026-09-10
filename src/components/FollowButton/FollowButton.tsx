import { FollowAction } from "@/actions/Follow/Follow.action";
import { useFollow } from "@/hooks/useFollow";
import { useToast } from "@/providers/ToastProvider";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Plus, UserMinus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// =============================================================
function FollowButton({
  followingId,
  followColor,
  unfollowColor,
  textColor,
}: {
  followingId: string;
  followColor: string;
  unfollowColor: string;
  textColor: string;
}) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { data: follow } = useFollow(followingId);
  const { setToast } = useToast();
  const router = useRouter();
  const handleFollow = async () => {
    try {
      setLoading(true);
      const result = await FollowAction(followingId);
      if (!result.success)
        return setToast({
          open: true,
          message: result.message || "حدث خطأ أثناء المتابعة.",
          type: "error",
        });
      if (result.message)
        setToast({ open: true, message: result.message, type: "success" });
      router.refresh();
      queryClient.setQueryData(["follow", followingId], !follow);
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
      className={clsx(textColor, follow ? unfollowColor : followColor)}
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
export default FollowButton;
