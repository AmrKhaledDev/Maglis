import { useUser } from "@/providers/UserProvider";
import { Post } from "@/types/post.type";
import DeletePostButton from "./DeletePostButton";
import EditPostButton from "./EditPostButton";
import PostSettingButton from "./PostSettingButton";
import { postSettings } from "@/data/PostOptions/PostSettings";
// =============================================================
function PostOwnerOptions({ post }: { post: Post }) {
  const userSession = useUser();
  return (
    <>
      {userSession.id === post.authorId && (
        <>
          <EditPostButton post={post} />
          {postSettings.map((button) => (
            <PostSettingButton
              key={button.type}
              post={post}
              enabledLabel={button.enabledLabel}
              disabledLabel={button.disabledLabel}
              type={button.type}
              Icon={button.Icon}
            />
          ))}

          <DeletePostButton post={post} />
        </>
      )}
    </>
  );
}

export default PostOwnerOptions;
