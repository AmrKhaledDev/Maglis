import { UpdatePostSettingsAction } from "@/actions/Post/UpdatePostSettings.action";
import { useToast } from "@/providers/ToastProvider";
import { PostDBType } from "@/types/PostDB.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pin } from "lucide-react";
import { useRouter } from "next/navigation";
// =====================================================================================
function PinnedToProfileBtn({ post }: { post: PostDBType }) {
  const router = useRouter();
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: handlePinnedToProfile, isPending: loading } = useMutation({
    mutationFn: async () => {
      const result = await UpdatePostSettingsAction("PINNED", post.id);
      if (!result.success) throw new Error(result.message);
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({
        queryKey: ["user_posts"],
      });
    },
    onError: (error: Error) => {
      setToast({
        open: true,
        message: error.message,
        type: "error",
      });
    },
  });
  return (
    <button
      onClick={() => handlePinnedToProfile()}
      disabled={loading}
      className={`postBtnAct ${post.isPinnedToProfile && "text-amber-500"}`}
    >
      <Pin
        className={`postBtnActIcon ${post.isPinnedToProfile && "rotate-45"}`}
      />
      {post.isPinnedToProfile
        ? "إلغاء التثبيت من الملف الشخصي"
        : "تثبيت في الملف الشخصي"}
    </button>
  );
}

export default PinnedToProfileBtn;
