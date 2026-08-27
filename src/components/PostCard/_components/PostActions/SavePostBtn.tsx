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
function SavePostBtn({
  post,
  isVideosPage,
  isCommentsModalOpen,
}: {
  post: PostType;
  isVideosPage?: boolean;
  isCommentsModalOpen?: boolean;
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
      {isVideosPage ? (
        <button
          disabled={loading}
          onClick={() => handleSavePost()}
          className="videoBtnActionStyle"
        >
          <Bookmark
            className={clsx(
              isSaved && "fill-green-600 text-green-600",
              isCommentsModalOpen ? "size-5" : "size-7",
            )}
          />
        </button>
      ) : (
        <button
          disabled={loading}
          onClick={() => handleSavePost()}
          className="not-disabled:cursor-pointer disabled:text-gray-500 flex items-center gap-1"
        >
          <Bookmark
            strokeWidth={1}
            className={clsx(
              "size-5",
              isSaved && "fill-green-500 text-green-500",
            )}
          />
        </button>
      )}
    </>
  );
}

export default SavePostBtn;
