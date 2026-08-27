import { HiddenPostAction } from "@/actions/HiddenPost/HiddenPost.action";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EyeOff } from "lucide-react";
// ===============================================
function HiddenPostBtn({ post }: { post: PostType }) {
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const userSession = useUser();
  const { mutate: handleHiddenPost, isPending } = useMutation({
    mutationFn: async () => {
      if (post.authorId === userSession.id)
        throw new Error("لا يمكنك إخفاء منشوراتك.");
      const result = await HiddenPostAction(post.id);
      if (!result.success) throw new Error(result.message);
      return result;
    },
    onSuccess: (result) => {
      invalidateUserCaches(queryClient, userSession);
      setToast({
        open: true,
        message: result.message,
        type: "success",
      });
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
      onClick={() => handleHiddenPost()}
      className="postBtnOpt"
    >
      <EyeOff className="postBtnOptIcon" /> إخفاء المنشور
    </button>
  );
}

export default HiddenPostBtn;
