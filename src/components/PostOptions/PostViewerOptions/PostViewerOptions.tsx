import { UrlUserProfile } from "@/lib/UrlUserProfile";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { UserRound } from "lucide-react";
import Link from "next/link";
import HiddenPostBtn from "./HiddenPostBtn";
import BlockBtn from "./BlockBtn";
import FollowBtn from "@/components/FollowBtn/FollowBtn";
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
          <HiddenPostBtn post={post} />
          {post.author.professionalMode && (
            <FollowBtn
              followingId={post.authorId}
              textColor="postBtnOpt"
              followColor=""
              unfollowColor="text-red-500!"
            />
          )}
          <BlockBtn authorId={post.authorId} />
        </>
      )}
    </>
  );
}

export default PostViewerOptions;
