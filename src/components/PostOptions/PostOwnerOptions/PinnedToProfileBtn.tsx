import { UpdatePostSettingsAction } from "@/actions/Post/UpdatePostSettings.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Pin } from "lucide-react";
import { useRouter } from "next/navigation";
// =====================================================================================
function PinnedToProfileBtn({ post }: { post: PostType }) {
  const userSession = useUser();
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
        queryKey: ["user_posts", userSession.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts", userSession.id],
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
      className={clsx("postBtnOpt", post.isPinnedToProfile && "text-red-500")}
    >
      <Pin
        className={clsx(
          "postBtnOptIcon",
          post.isPinnedToProfile && "rotate-45",
        )}
      />
      {post.isPinnedToProfile
        ? "إلغاء التثبيت من الملف الشخصي"
        : "تثبيت في الملف الشخصي"}
    </button>
  );
}

export default PinnedToProfileBtn;
