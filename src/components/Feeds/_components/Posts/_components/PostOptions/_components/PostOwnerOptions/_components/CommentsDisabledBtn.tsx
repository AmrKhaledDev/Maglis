import { UpdatePostSettingsAction } from "@/actions/Post/Edit/UpdatePostSettings.action";
import { useToast } from "@/providers/ToastProvider";
import { PostDBType } from "@/types/PostDBType";
import { MessageSquareOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// =================================================
function CommentsDisabledBtn({ post }: { post: PostDBType }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setToast } = useToast();
  const handleCommentsDisabled = async () => {
    try {
      setLoading(true);
      const result = await UpdatePostSettingsAction(
        "COMMENTS_DISABLED",
        post.id,
      );
      if (!result.success)
        return setToast({
          type: "error",
          message: result.message,
          open: true,
        });
      router.refresh();
    } catch (error) {
      console.error(error);
      setToast({
        type: "error",
        message: "",
        open: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      disabled={loading}
      onClick={handleCommentsDisabled}
      className={`postBtnAct ${post.commentsDisabled && "text-red-500"}`}
    >
      <MessageSquareOff className="postBtnActIcon" />
      {post.commentsDisabled ? "السماح بالتعليقات" : "إيقاف التعليقات"}
    </button>
  );
}

export default CommentsDisabledBtn;
