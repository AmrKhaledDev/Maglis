import FollowButton from "@/components/FollowButton/FollowButton";
import { useUser } from "@/providers/UserProvider";
import { Post } from "@/types/Post.type";
import AddFriendButton from "../../../AddFriendButton/AddFriendButton";
import useIsFriend from "@/hooks/useIsFriend";
// =====================================================
function AuthorActions({ post }: { post: Post }) {
  const userSession = useUser();
  const isFriend = useIsFriend(post.authorId);
  return (
    <>
      {userSession.id !== post.authorId &&
        (post.author.professionalMode ? (
          <FollowButton
            followingId={post.authorId}
            followStyle="bg-gray-50 text-blue-700 font-semibold shadow"
            unfollowStyle="hover:text-gray-200"
            publicStyle="flex items-center gap-2 active:scale-98 cursor-pointer text-xs disabled:cursor-default py-1.5 px-3 rounded-full text-nowrap"
            iconStyle="size-4"
          />
        ) : isFriend ? (
          <p className="text-xs text-gray-500">أصدقاء</p>
        ) : (
          <AddFriendButton
            publicStyle="text-[11px] flex items-center gap-1 mytransition active:scale-98 px-2 rounded-full cursor-pointer disabled:cursor-default py-1.5"
            unsentStyle="hover:text-gray-200"
            sentStyle="bg-blue-700/50 shadow"
            iconStyle="size-4"
            userId={post.authorId}
          />
        ))}
    </>
  );
}

export default AuthorActions;
