"use client";
import { SavePostAction } from "@/actions/SavePost/SavePost.action";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
// ================================================
function SavePostButton({
  post,
  isCommentsModalOpen,
  buttonStyle,
  iconSize,
}: {
  post: PostType;
  isCommentsModalOpen?: boolean;
  buttonStyle?: string;
  iconSize?: string;
  
}) {
  const router = useRouter();
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: handleSavePost, isPending: loading } = useMutation({
    mutationFn: async () => {
      const result = await SavePostAction(post.id);
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
  const userSession = useUser();
  const isSaved = userSession.savedPosts.some((item) => item.postId == post.id);
  return (
    <>
      <button
        disabled={loading}
        onClick={() => handleSavePost()}
        className={clsx(buttonStyle, "cursor-pointer")}
      >
        <Bookmark
          className={clsx(isSaved && "fill-green-500 text-green-500", iconSize)}
        />
      </button>
    </>
  );
}

export default SavePostButton;

// "not-disabled:cursor-pointer disabled:text-gray-500 flex items-center gap-1"
