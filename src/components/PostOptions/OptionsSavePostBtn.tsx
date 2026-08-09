import { SavePostAction } from "@/actions/SavePost/SavePost.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useRouter } from "next/navigation";
// =====================================================================
function OptionsSavePostBtn({ post }: { post: PostType }) {
  const { setToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: handleSavePost, isPending: loading } = useMutation({
    mutationFn: async () => {
      const result = await SavePostAction(post.id);
      if (!result.success) throw new Error(result.message);
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({
        queryKey:["user_savedPosts"]
      })
    },
    onError: (error: Error) => {
      setToast({
        type: "success",
        open: true,
        message: error.message,
      });
    },
  });

  const user = useUser();
  const isSaved = user.savedPosts.some((item) => item.postId == post.id);
  console.log(isSaved);
  return (
    <button
      onClick={() => handleSavePost()}
      disabled={loading}
      className={`postBtnAct ${isSaved ? "text-green-600" : ""}`}
    >
      <Save className="postBtnActIcon" /> {isSaved ? "محفوظ" : "حفظ"}
    </button>
  );
}

export default OptionsSavePostBtn;
