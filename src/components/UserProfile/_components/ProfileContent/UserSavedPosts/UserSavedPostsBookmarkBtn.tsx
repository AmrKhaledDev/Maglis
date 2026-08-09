import { SavePostAction } from "@/actions/SavePost/SavePost.action";
import { useToast } from "@/providers/ToastProvider";
import { SavePostType } from "@/types/SavePost.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
// ========================================
function UserSavedPostsBookmarkBtn({ saveItem }: { saveItem: SavePostType }) {
  const router = useRouter();
  const { setToast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: handleUnsavedPost, isPending: loading } = useMutation({
    mutationFn: async () => {
      const result = await SavePostAction(saveItem.postId);
      if (!result.success)
        return setToast({
          open: true,
          message: result.message,
          type: "error",
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user_savedPosts"],
      });
      router.refresh();
    },
    onError: () => {},
  });
  return (
    <button
      disabled={loading}
      onClick={() => handleUnsavedPost()}
      className="h-fit group not-disabled:cursor-pointer hover:scale-110 mytransition active:scale-90"
    >
      <Bookmark
        strokeWidth={1}
        className="size-4 group-disabled:fill-gray-400 fill-green-500 text-green-500"
      />
    </button>
  );
}

export default UserSavedPostsBookmarkBtn;
