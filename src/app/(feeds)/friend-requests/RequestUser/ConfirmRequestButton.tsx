import { ConfirmFriendRequestAction } from "@/actions/FriendRequest/ConfirmFriendRequest.action";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import FriendRequestType from "@/types/FriendRequest.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// ====================================================
function ConfirmRequestButton({ request }: { request: FriendRequestType }) {
  const userSession = useUser();
  const queryClient = useQueryClient();
  const { setToast } = useToast();
  const router = useRouter();
  const { mutate: handleConfirmRequest, isPending } = useMutation({
    mutationFn: async () => {
      const result = await ConfirmFriendRequestAction(request.senderId);
      if (!result.success) throw new Error(result.message);
    },
    onSuccess: () => {
      invalidateUserCaches(queryClient, userSession);
      router.refresh();
    },
    onError: (err: Error) => {
      setToast({
        open: true,
        message: err.message,
        type: "error",
      });
    },
  });
  return (
    <button
      onClick={() => handleConfirmRequest()}
      disabled={isPending}
      className="text-xs py-2 px-4 bg-white/3 not-disabled:cursor-pointer not-disabled:hover:bg-white/5 mytransition"
    >
      تأكيد الطلب
    </button>
  );
}

export default ConfirmRequestButton;
