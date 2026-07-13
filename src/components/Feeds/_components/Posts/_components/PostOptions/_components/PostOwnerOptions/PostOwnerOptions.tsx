import { PostDBType } from "@/types/PostDBType";
import EditPostBtn from "./_components/EditPostBtn";
import PinnedToPofileBtn from "./_components/PinnedToPofileBtn";
import CommentsDisabledBtn from "./_components/CommentsDisabledBtn";
import { useUser } from "@/providers/UserProvider";
import DeletePostBtn from "./_components/DeletePostBtn";
import { Dispatch, SetStateAction } from "react";
// =============================================================
function PostOwnerOptions({
  post,
  setShowOptions,
}: {
  post: PostDBType;
  setShowOptions: Dispatch<SetStateAction<string>>;
}) {
  const user = useUser();
  return (
    <>
      {user.id === post.authorId && (
        <>
          <EditPostBtn />
          <PinnedToPofileBtn post={post} />
          <CommentsDisabledBtn post={post} />
          <DeletePostBtn post={post} setShowOptions={setShowOptions} />
          <hr className=" border-zinc-700 opacity-8" />
        </>
      )}
    </>
  );
}

export default PostOwnerOptions;
