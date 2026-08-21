import { DeleteUserImageAction } from "@/actions/User/DeleteUserImageAction";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useUser } from "@/providers/UserProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
// ======================================
function DeleteImageBtn({
  setError,
  typeImage,
}: {
  setError: Dispatch<SetStateAction<string>>;
  typeImage: "COVER" | "AVATAR";
}) {
  const { setActiveModal } = useActiveModal();
  const userSession = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: handleDeleteAvatar, isPending: loading } = useMutation({
    mutationFn: async () => {
      setError("");
      const result = await DeleteUserImageAction(userSession.id, typeImage);
      if (!result.success)
        return setError(
          result.message || "حدث خطأ أثناء حذف صورة الملف الشخصي.",
        );
      router.refresh();
      setActiveModal(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_posts", userSession.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["comments", userSession.id],
      });
    },
  });
  return (
    <button
      disabled={loading}
      onClick={() => handleDeleteAvatar()}
      className="flex items-center not-disabled:hover:bg-slate-600/20 mytransition disabled:text-gray-500 p-3 text-[17px] text-red-300 not-disabled:cursor-pointer flex-col"
    >
      <Trash2 strokeWidth={1.5} />
      {loading ? (
        <div className="border border-gray-500 rounded-full size-4 animate-[spin_0.5s_linear_infinite] border-t-transparent mt-2" />
      ) : (
        "حذف"
      )}
    </button>
  );
}

export default DeleteImageBtn;
