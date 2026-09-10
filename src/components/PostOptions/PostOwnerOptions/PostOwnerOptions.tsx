import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import CommentsDisabledButton from "./CommentsDisabledButton";
import DeletePostButton from "./DeletePostButton";
import EditPostButton from "./EditPostButton";
import PinnedToProfileButton from "./PinnedToProfileButton";
import ShowMediaInProfileButton from "./ShowMediaInProfileButton";
// =============================================================
function PostOwnerOptions({ post }: { post: PostType }) {
  const userSession = useUser();
  return (
    <>
      {userSession.id === post.authorId && (
        <>
          <EditPostButton post={post} />
          <PinnedToProfileButton post={post} />
          <CommentsDisabledButton post={post} />
          <ShowMediaInProfileButton post={post} />
          <DeletePostButton post={post} />
        </>
      )}
    </>
  );
}

export default PostOwnerOptions;
