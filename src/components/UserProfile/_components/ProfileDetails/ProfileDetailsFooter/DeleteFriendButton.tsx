import { DeleteFriendShipAction } from "@/actions/FriendShip/DeleteFriendShip.action";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserRoundX } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
// =======================================
function DeleteFriendButton({
  userId,
  setIsFriend,
}: {
  userId: string;
  setIsFriend: Dispatch<SetStateAction<boolean>>;
}) {
  const { setToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const userSession = useUser();
  const { mutate: handleDeleteFriendShip, isPending } = useMutation({
    mutationFn: async () => {
      const result = await DeleteFriendShipAction(userId);
      if (!result.success)
        throw new Error(result.message || "حدث خطأ أثناء إلغاء الصداقة");
    },
    onSuccess: () => {
      router.refresh();
      invalidateUserCaches(queryClient, userSession);
      setIsFriend(false);
    },
    onError: (err: Error) => {
      return setToast({
        open: true,
        message: err.message,
        type: "error",
      });
    },
  });
  return (
    <button
      onClick={() => handleDeleteFriendShip()}
      disabled={isPending}
      className="flex text-xs items-center  gap-2 cursor-pointer font-semibold shadow py-2 px-3 rounded-full text-nowrap hover:outline-red-900/40 outline-offset-2 hover:outline bg-red-900/40 text-red-300"
    >
      <UserRoundX className="size-4" /> إلغاء الصداقة
    </button>
  );
}

export default DeleteFriendButton;
