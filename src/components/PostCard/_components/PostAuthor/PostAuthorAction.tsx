import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import PostAuthorFriendRequestBtn from "./PostAuthorFriendRequestBtn";
import PostAuthorFollowBtn from "./PostAuthorFollowBtn";
// =====================================================
function PostAuthorAction({ post }: { post: PostType }) {
  const userSession = useUser();
  return (
    <>
      {userSession.id !== post.authorId &&
        (post.author.professionalMode ? (
          <PostAuthorFollowBtn post={post} />
        ) : (
          <PostAuthorFriendRequestBtn post={post} />
        ))}
    </>
  );
}

export default PostAuthorAction;
