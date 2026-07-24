import { PostDBType } from "@/types/PostDB.type";
import EditPostBtn from "./EditPostBtn";
import CommentsDisabledBtn from "./CommentsDisabledBtn";
import { useUser } from "@/providers/UserProvider";
import DeletePostBtn from "./DeletePostBtn";
import PinnedToProfileBtn from "./PinnedToProfileBtn";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
// =============================================================
function PostOwnerOptions({ post }: { post: PostDBType }) {
  const { setActiveMenu } = useActiveMenu();
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
