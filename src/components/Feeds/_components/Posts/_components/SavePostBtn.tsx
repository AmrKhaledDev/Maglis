"use client";
import { SavePostAction } from "@/actions/SavePost/SavePost.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { PostDBType } from "@/types/PostDB.type";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// ================================================
function SavePostBtn({ post }: { post: PostDBType }) {
  const { setToast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSavePost = async () => {
    try {
      setLoading(true);
      const result = await SavePostAction(post.id);
      if (!result.success)
        return setToast({
          open: true,
          message: result.message,
          type: "error",
        });
      router.refresh();
      setToast({
        type: "success",
        open: true,
        message: result.message,
      });
    } catch (error) {
      console.error(error);
      setToast({
        message: "حدث خطأ أثناء إنشاء منشورك حاول مرة أخرى",
        type: "error",
        open: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const user = useUser();
  const isSaved = user.savedPosts.some((item) => item.postId == post.id);
  return (
    <button
      disabled={loading}
      onClick={handleSavePost}
      className="not-disabled:cursor-pointer disabled:text-gray-500 flex items-center gap-1"
    >
      <Bookmark
        strokeWidth={1}
        className={`size-5  ${isSaved && "fill-green-500 text-green-500"}`}
      />
      
    </button>
  );
}

export default SavePostBtn;
