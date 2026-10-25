"use client";
import { SavePostAction } from "@/actions/SavePost/SavePost.action";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Bookmark, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons/lib";
// ================================================
function SavePostButton({
  postId,
  buttonStyle,
  iconStyle,
  withText,
  saveText,
  unSaveText,
  Icon,
  isSavedStyle,
}: {
  postId: string;
  buttonStyle?: string;
  iconStyle?: string;
  withText?: boolean;
  saveText?: string;
  unSaveText?: string;
  Icon?: IconType | LucideIcon;
  isSavedStyle?: string;
}) {
  const userSession = useUser();
  const router = useRouter();
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: handleSavePost, isPending: loading } = useMutation({
    mutationFn: async () => {
      const result = await SavePostAction(postId);
      if (!result.success) throw new Error(result.message);
      return result.message;
    },
    onSuccess: (message) => {
      invalidateUserCaches(queryClient, userSession);
      router.refresh();
      setToast({
        open: true,
        message,
        type: "success",
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
  const isSaved = userSession.savedPosts.some((item) => item.postId == postId);
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => handleSavePost()}
      className={clsx("cursor-pointer", buttonStyle, isSaved && isSavedStyle)}
    >
      {Icon ? (
        <Icon className={clsx(iconStyle)} />
      ) : (
        <Bookmark className={clsx(isSaved && "fill-green-500", iconStyle)} />
      )}
      {withText && (isSaved ? unSaveText : saveText)}
    </button>
  );
}

export default SavePostButton;
