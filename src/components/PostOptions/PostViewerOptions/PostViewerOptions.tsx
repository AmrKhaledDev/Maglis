import { UrlUserProfile } from "@/lib/UrlUserProfile";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { Ban, BellOff, EyeOff, UserRound } from "lucide-react";
import Link from "next/link";
import FollowBtn from "./FollowBtn";
// ========================================================
function PostViewerOptions({ post }: { post: PostType }) {
  const userSession = useUser();
  return (
    <>
      {userSession.id !== post.authorId && (
        <>
          <Link href={UrlUserProfile(post.authorId)} className="postBtnOpt">
            <UserRound className="postBtnOptIcon" /> عرض الملف الشخصي
          </Link>
          <button className="postBtnOpt">
            <EyeOff className="postBtnOptIcon" /> إخفاء المنشور
          </button>
          <FollowBtn />
          <button className="postBtnOpt text-red-600">
            <Ban className="postBtnOptIcon" /> حظر
          </button>
        </>
      )}
    </>
  );
}

export default PostViewerOptions;
