import { DeleteAction } from "@/actions/FriendRequest/Delete.action";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import FriendRequest from "@/types/FriendRequest.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// ===========================================================
function RejectRequestButton({ request }: { request: FriendRequest }) {
  const userSession = useUser();
  const router = useRouter();
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: handleDeleteRequest, isPending } = useMutation({
    mutationFn: async () => {
      const result = await DeleteAction(request.senderId);
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
      disabled={isPending}
      onClick={() => handleDeleteRequest()}
      className="text-sm py-2 px-4 bg-red-900/20 text-red-500 not-disabled:cursor-pointer not-disabled:hover:bg-red-700/25 mytransition rounded-full"
    >
      رفض الطلب
    </button>
  );
}

export default RejectRequestButton;
