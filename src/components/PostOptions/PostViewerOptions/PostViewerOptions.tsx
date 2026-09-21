import FollowButton from "@/components/FollowButton/FollowButton";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { UserRound } from "lucide-react";
import Link from "next/link";
import BlockButton from "../../BlockButton/BlockButton";
import HiddenPostButton from "./HiddenPostButton";
import useIsBlocked from "@/hooks/useIsBlocked";
import { useUrlUserProfile } from "@/hooks/useUrlUserProfile";
// ========================================================
function PostViewerOptions({ post }: { post: PostType }) {
  const userSession = useUser();
  const isBlocked = useIsBlocked(post.authorId);
  return (
    <>
      {userSession.id !== post.authorId && (
        <>
          <Link href={useUrlUserProfile(post.authorId)} className="btnOptBox">
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
          <BlockButton
            userId={post.authorId}
            style={`btnOptBox ${
              isBlocked
                ? "text-green-700 hover:text-green-700!"
                : "text-red-700 hover:text-red-700!"
            }`}
            iconSize="btnOptIcon"
          />
        </>
      )}
    </>
  );
}

export default PostViewerOptions;
