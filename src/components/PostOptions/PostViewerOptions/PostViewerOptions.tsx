import { UrlUserProfile } from "@/lib/UrlUserProfile";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import {UserRound } from "lucide-react";
import Link from "next/link";
import FollowBtn from "./FollowBtn";
import HiddenPostBtn from "./HiddenPostBtn";
import BlockBtn from "./BlockBtn";
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
          <FollowBtn />
          <BlockBtn authorId={post.authorId} />
        </>
      )}
    </>
  );
}

export default PostViewerOptions;
