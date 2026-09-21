import { UserBlockAction } from "@/actions/UserBlock/UserBlock.action";
import useIsBlocked from "@/hooks/useIsBlocked";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ban } from "lucide-react";
import { useRouter } from "next/navigation";
// ================================================================
function BlockButton({
  userId,
  style,
  iconSize,
}: {
  userId: string;
  style?: string;
  iconSize?: string;
}) {
  const { setToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const userSession = useUser();
  const { mutate: handleUserBlock, isPending } = useMutation({
    mutationFn: async () => {
      if (userId === userSession.id) throw new Error("لا يمكنك حظر نفسك.");
      const result = await UserBlockAction(userId);
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
  const isBlocked = useIsBlocked(userId);
  return (
    <button
      onClick={() => handleUserBlock()}
      disabled={isPending}
      className={style}
    >
      <Ban className={iconSize} /> {isBlocked ? "فك الحظر" : "حظر"}
    </button>
  );
}

export default BlockButton;
