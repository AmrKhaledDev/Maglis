import useIsUserBlocked from "@/hooks/useIsUserBlocked";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { Ban } from "lucide-react";
import BlockModal from "../modals/BlockModal";
import { useToast } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/providers/UserProvider";
import { UserBlockAction } from "@/actions/UserBlock/UserBlock.action";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
// =====================================================================
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
  const isBlocked = useIsUserBlocked(userId);
  const { activeModal, setActiveModal } = useActiveModal();
  return (
    <>
      <button
        onClick={() => {
          setActiveModal(isBlocked ? null : "block_modal");
          if (isBlocked) handleUserBlock();
        }}
        className={style}
      >
        <Ban className={iconSize} /> {isBlocked ? "فك الحظر" : "حظر"}
      </button>
      {activeModal === "block_modal" && (
        <BlockModal handleUserBlock={handleUserBlock} isPending={isPending} />
      )}
    </>
  );
}

export default BlockButton;
