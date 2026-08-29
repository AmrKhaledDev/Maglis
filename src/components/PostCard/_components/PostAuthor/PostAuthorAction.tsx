import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import PostAuthorFriendRequestBtn from "./PostAuthorFriendRequestBtn";
import FollowBtn from "@/components/FollowBtn/FollowBtn";
// =====================================================
function PostAuthorAction({ post }: { post: PostType }) {
  const userSession = useUser();
  return (
    <>
      {userSession.id !== post.authorId &&
        (post.author.professionalMode ? (
          <FollowBtn
            followingId={post.authorId}
            followColor="bg-gray-200 hover:bg-gray-300 text-blue-700 font-semibold"
            textColor="shadow flex items-center gap-2 mytransition active:scale-98 cursor-pointer text-xs disabled:cursor-default py-1.5 px-3 rounded text-nowrap"
            unfollowColor="bg-white/10 not-disabled:hover:bg-white/15"
          />
        ) : (
          <PostAuthorFriendRequestBtn post={post} />
        ))}
    </>
  );
}

export default PostAuthorAction;
