import { CreateFriendRequestAction } from "@/actions/FriendRequest/CreateFriendRequest.action";
import useAddFriend from "@/hooks/useAddFriend";
import { useToast } from "@/providers/ToastProvider";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Check, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// =======================================
function AddFriendButton({
  userId,
  sentStyle,
  unsentStyle,
  textStyle,
}: {
  userId: string;
  sentStyle: string;
  unsentStyle: string;
  textStyle: string;
}) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { data: isSent } = useAddFriend(userId);
  const router = useRouter();
  const { setToast } = useToast();
  const handleFrientRequest = async () => {
    try {
      setLoading(true);
      const result = await CreateFriendRequestAction(userId);
      if (!result.success)
        return setToast({
          open: true,
          message: result.message || "حدث خطأ أثناء إرسال طلب الصداقة.",
          type: "error",
        });
      queryClient.setQueryData(["friend", userId], !isSent);
      router.refresh();
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
      className={clsx(textStyle, isSent ?  unsentStyle : sentStyle)}
    >
      {isSent ? (
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

export default AddFriendButton;
