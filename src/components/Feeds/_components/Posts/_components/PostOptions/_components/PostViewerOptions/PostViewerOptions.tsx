import { useUser } from "@/providers/UserProvider";
import { PostDBType } from "@/types/PostDBType";
import { Ban, BellOff, EyeOff, UserPlus, UserRound } from "lucide-react";
// ========================================================
function PostViewerOptions({ post }: { post: PostDBType }) {
  const user = useUser();
  return (
    <>
      {user.id !== post.authorId && (
        <>
          <button className="postBtnAct">
            <UserRound className="postBtnActIcon" /> عرض الملف الشخصي
          </button>
          <button className="postBtnAct">
            <EyeOff className="postBtnActIcon" /> إخفاء هذا المنشور
          </button>
          <button className="postBtnAct">
            <BellOff className="postBtnActIcon" /> كتم منشورات المستخدم
          </button>
          <button className="postBtnAct">
            <Ban className="postBtnActIcon" /> حظر المستخدم
          </button>
          <button className="postBtnAct">
            <UserPlus className="postBtnActIcon" /> متابعة المستخدم
          </button>
          <hr className=" border-zinc-700 opacity-8" />
        </>
      )}
    </>
  );
}

export default PostViewerOptions;
