import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { Post } from "@/types/post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
// ==================================================================
function PostSettingButton({
  post,
  type,
  Icon,
  enabledLabel,
  disabledLabel,
}: {
  post: Post;
  type: "showMediaInProfile" | "isPinnedToProfile" | "commentsDisabled";
  Icon: IconType | LucideIcon;
  enabledLabel: string;
  disabledLabel: string;
}) {
  const { setToast } = useToast();
  const userSession = useUser();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/edit/${post.id}`,
          {
            content: post.content,
            media: post.media,
            showMediaInProfile:
              type === "showMediaInProfile"
                ? !post.showMediaInProfile
                : post.showMediaInProfile,
            isPinnedToProfile:
              type === "isPinnedToProfile"
                ? !post.isPinnedToProfile
                : post.isPinnedToProfile,
            commentsDisabled:
              type === "commentsDisabled"
                ? !post.commentsDisabled
                : post.commentsDisabled,
          },
          {
            withCredentials: true,
          },
        );
        const { success, message } = data;
        if (!success) throw new Error(message);
      } catch (error) {
        console.error(error);
        if (error instanceof AxiosError)
          throw new Error(error.response?.data.message);
        throw new Error("حدث خطأ, فشل التعديل.");
      }
    },
    onSuccess: () => {
      invalidateUserCaches(queryClient, userSession);
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
      onClick={() => mutate()}
      disabled={isPending}
      className={clsx("btnOptBox", post[type] && "text-red-500")}
    >
      <Icon className="btnOptIcon" />
      {post[type] ? enabledLabel : disabledLabel}
    </button>
  );
}

export default PostSettingButton;
