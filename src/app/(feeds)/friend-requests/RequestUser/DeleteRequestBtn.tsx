import { DeleteFriendRequestAction } from "@/actions/FriendRequest/DeleteFriendRequest";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import FriendRequestType from "@/types/FriendRequest.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// ===========================================================
function DeleteRequestBtn({ request }: { request: FriendRequestType }) {
  const userSession = useUser();
  const router = useRouter();
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: handleDeleteRequest, isPending } = useMutation({
    mutationFn: async () => {
      const result = await DeleteFriendRequestAction(request.senderId);
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
      className="text-xs py-2 px-4 bg-red-700/20 not-disabled:cursor-pointer not-disabled:hover:bg-red-700/25 mytransition"
    >
      رفض الطلب
    </button>
  );
}

export default DeleteRequestBtn;
