import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { Ban, BellOff, EyeOff, UserPlus, UserRound } from "lucide-react";
// ========================================================
function PostViewerOptions({ post }: { post: PostType }) {
  const user = useUser();
  return (
    <>
      {user.id !== post.authorId && (
        <>
          <button className="postBtnOpt">
            <UserRound className="postBtnOptIcon" /> عرض الملف الشخصي
          </button>
          <button className="postBtnOpt">
            <EyeOff className="postBtnOptIcon" /> إخفاء هذا المنشور
          </button>
          <button className="postBtnOpt">
            <BellOff className="postBtnOptIcon" /> كتم المنشورات
          </button>
          <button className="postBtnOpt">
            <UserPlus className="postBtnOptIcon" /> متابعة
          </button>
          <button className="postBtnOpt text-red-600">
            <Ban className="postBtnOptIcon" /> حظر
          </button>
        </>
      )}
    </>
  );
}

export default PostViewerOptions;
