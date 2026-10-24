import FollowButton from "@/components/FollowButton/FollowButton";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import AddFriendButton from "../../../AddFriendButton/AddFriendButton";
// =====================================================
function AuthorActions({ post }: { post: PostType }) {
  const userSession = useUser();
  const isFriend = userSession.myFriends.some(
    (friend) => friend.friend.id === post.authorId,
  );
  return (
    <>
      {userSession.id !== post.authorId &&
        (post.author.professionalMode ? (
          <FollowButton
            followingId={post.authorId}
            followStyle="bg-gray-200 hover:bg-gray-300 text-blue-700 font-semibold"
            publicStyle="shadow flex items-center gap-2 active:scale-98 cursor-pointer text-xs disabled:cursor-default py-1.5 px-3 rounded text-nowrap"
            iconStyle="size-4"
          />
        ) : isFriend ? (
          <p className="font-semibold text-xs text-gray-400">أصدقاء</p>
        ) : (
          <AddFriendButton
            publicStyle="shadow text-[11px] flex items-center gap-1 mytransition active:scale-98 px-2 rounded cursor-pointer disabled:cursor-default py-1.5"
            sentStyle="bg-white/5 text-xs not-disabled:hover:bg-white/10"
            unsentStyle="not-disabled:hover:bg-blue-700/40  bg-blue-700/50"
            iconStyle="size-4"
            userId={post.authorId}
          />
        ))}
    </>
  );
}

export default AuthorActions;
