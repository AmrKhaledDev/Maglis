import { UpdatePostSettingsAction } from "@/actions/Post/UpdatePostSettings.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { MessageSquareOff } from "lucide-react";
import { useRouter } from "next/navigation";
// =================================================
function CommentsDisabledBtn({ post }: { post: PostType }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useUser();
  const { setToast } = useToast();
  const { mutate: handleCommentsDisabled, isPending: loading } = useMutation({
    mutationFn: async () => {
      const result = await UpdatePostSettingsAction(
        "COMMENTS_DISABLED",
        post.id,
      );
      if (!result.success) throw new Error(result.message);
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({
        queryKey: ["user_posts", user.id],
      });
    },
    onError: (error: Error) => {
      setToast({
        message: error.message,
        open: true,
        type: "error",
      });
    },
  });
  return (
    <button
      disabled={loading}
      onClick={() => handleCommentsDisabled()}
      className={clsx("postBtnAct", post.commentsDisabled && "text-red-500")}
    >
      <MessageSquareOff className="postBtnActIcon" />
      {post.commentsDisabled ? "السماح بالتعليقات" : "إيقاف التعليقات"}
    </button>
  );
}

export default CommentsDisabledBtn;
