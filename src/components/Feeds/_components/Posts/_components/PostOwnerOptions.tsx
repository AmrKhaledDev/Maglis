import { PostDBType } from "@/types/PostDB.type";
import EditPostBtn from "./EditPostBtn";
import CommentsDisabledBtn from "./CommentsDisabledBtn";
import { useUser } from "@/providers/UserProvider";
import DeletePostBtn from "./DeletePostBtn";
import { Dispatch, SetStateAction } from "react";
import PinnedToProfileBtn from "./PinnedToProfileBtn";
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
          <EditPostBtn post={post}/>
          <PinnedToProfileBtn post={post} />
          <CommentsDisabledBtn post={post} />
          <DeletePostBtn post={post} setShowOptions={setShowOptions} />
          <hr className=" border-zinc-700 opacity-8" />
        </>
      )}
    </>
  );
}

export default PostOwnerOptions;
