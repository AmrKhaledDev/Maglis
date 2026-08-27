import { UserBlockAction } from "@/actions/UserBlock/UserBlock.action";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Ban } from "lucide-react";
// ====================================
function BlockBtn({ authorId }: { authorId: string }) {
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const userSession = useUser();
  const { mutate: handleUserBlock, isPending } = useMutation({
    mutationFn: async () => {
      if (authorId === userSession.id) throw new Error("لا يمكنك حظر نفسك.");
      const result = await UserBlockAction(authorId);
      if (!result.success) throw new Error(result.message);
    },
    onSuccess: () => {
      invalidateUserCaches(queryClient, userSession);
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
      onClick={() => handleUserBlock()}
      disabled={isPending}
      className="postBtnOpt text-red-700 hover:text-red-700!"
    >
      <Ban className="postBtnOptIcon" /> حظر
    </button>
  );
}

export default BlockBtn;
