import { FollowAction } from "@/actions/Follow/Follow.action";
import { useFollow } from "@/hooks/useFollow";
import { useToast } from "@/providers/ToastProvider";
import clsx from "clsx";
import { Plus, UserMinus } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
// =============================================================
function FollowBtn({
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
export default FollowBtn;
