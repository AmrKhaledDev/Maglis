import EditPostBtn from "./EditPostBtn";
import CommentsDisabledBtn from "./CommentsDisabledBtn";
import { useUser } from "@/providers/UserProvider";
import DeletePostBtn from "./DeletePostBtn";
import PinnedToProfileBtn from "./PinnedToProfileBtn";
import ShowMediaInProfileBtn from "./ShowMediaInProfileBtn";
import { PostType } from "@/types/Post.type";
// =============================================================
function PostOwnerOptions({ post }: { post: PostType }) {
  const user = useUser();
  return (
    <>
      {user.id === post.authorId && (
        <>
          <EditPostBtn post={post} />
          <PinnedToProfileBtn post={post} />
          <CommentsDisabledBtn post={post} />
          <ShowMediaInProfileBtn post={post} />
          <DeletePostBtn post={post} />
        </>
      )}
    </>
  );
}

export default PostOwnerOptions;
