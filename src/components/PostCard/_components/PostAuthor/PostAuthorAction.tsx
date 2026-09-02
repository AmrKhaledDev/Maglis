import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import FollowBtn from "@/components/FollowBtn/FollowBtn";
import AddFriendBtn from "../../../AddFriendBtn/AddFriendBtn";
// =====================================================
function PostAuthorAction({ post }: { post: PostType }) {
  const userSession = useUser();
  const isFriend = userSession.myFriends.some(
    (friend) => friend.friend.id === post.authorId,
  );
  return (
    <>
      {userSession.id !== post.authorId &&
        (post.author.professionalMode ? (
          <FollowBtn
            followingId={post.authorId}
            followColor="bg-gray-200 hover:bg-gray-300 text-blue-700 font-semibold"
            textColor="shadow flex items-center gap-2 active:scale-98 cursor-pointer text-xs disabled:cursor-default py-1.5 px-3 rounded text-nowrap"
            unfollowColor="bg-white/10 not-disabled:hover:bg-white/15"
          />
        ) : isFriend ? (
          <p className="font-semibold text-xs text-gray-400">أصدقاء</p>
        ) : (
          <AddFriendBtn
            textStyle="shadow text-[11px] flex items-center gap-1 mytransition active:scale-98 px-2 rounded cursor-pointer disabled:cursor-default py-1.5"
            sentStyle="bg-white/5 text-xs not-disabled:hover:bg-white/10"
            unsentStyle="not-disabled:hover:bg-blue-700/40  bg-blue-700/50"
            userId={post.authorId}
          />
        ))}
    </>
  );
}

export default PostAuthorAction;
