import { PostDBType } from "@/types/Post.type";
import EditPostBtn from "./EditPostBtn";
import CommentsDisabledBtn from "./CommentsDisabledBtn";
import { useUser } from "@/providers/UserProvider";
import DeletePostBtn from "./DeletePostBtn";
import PinnedToProfileBtn from "./PinnedToProfileBtn";
// =============================================================
function PostOwnerOptions({ post }: { post: PostDBType }) {
  const user = useUser();
  return (
    <>
      {user.id === post.authorId && (
        <>
          <EditPostBtn post={post} />
          <PinnedToProfileBtn post={post} />
          <CommentsDisabledBtn post={post} />
          <DeletePostBtn post={post} />
        </>
      )}
    </>
  );
}

export default PostOwnerOptions;
