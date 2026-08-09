"use client";
import { SavePostAction } from "@/actions/SavePost/SavePost.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
// ================================================
function SavePostBtn({ post }: { post: PostType }) {
  const router = useRouter();
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: handleSavePost, isPending: loading } = useMutation({
    mutationFn: async () => {
      const result = await SavePostAction(post.id);
      if (!result.success) throw new Error(result.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_savedPosts"],
      });
      router.refresh();
    },
    onError: (error: Error) => {
      setToast({
        open: true,
        message: error.message,
        type: "error",
      });
    },
  });
  const user = useUser();
  const isSaved = user.savedPosts.some((item) => item.postId == post.id);
  return (
    <button
      disabled={loading}
      onClick={() => handleSavePost()}
      className="not-disabled:cursor-pointer disabled:text-gray-500 flex items-center gap-1"
    >
      <Bookmark
        strokeWidth={1}
        className={clsx("size-5", isSaved && "fill-green-500 text-green-500")}
      />
    </button>
  );
}

export default SavePostBtn;
