import FollowButton from "@/components/FollowButton/FollowButton";
import { UrlUserProfile } from "@/lib/UrlUserProfile";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { UserRound } from "lucide-react";
import Link from "next/link";
import BlockButton from "../../BlockButton/BlockButton";
import HiddenPostButton from "./HiddenPostButton";
// ========================================================
function PostViewerOptions({ post }: { post: PostType }) {
  const userSession = useUser();
  return (
    <>
      {userSession.id !== post.authorId && (
        <>
          <Link href={UrlUserProfile(post.authorId)} className="btnOptBox">
            <UserRound className="btnOptIcon" /> عرض الملف الشخصي
          </Link>
          <HiddenPostButton post={post} />
          {post.author.professionalMode && (
            <FollowButton
              followingId={post.authorId}
              textColor="btnOptBox"
              followColor=""
              unfollowColor="text-red-500!"
            />
          )}
          <BlockButton authorId={post.authorId} />
        </>
      )}
    </>
  );
}

export default PostViewerOptions;
