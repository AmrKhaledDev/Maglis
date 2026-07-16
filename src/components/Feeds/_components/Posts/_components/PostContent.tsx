import { PostDBType } from "@/types/PostDB.type";
import PostContent_Media from "./PostContent_Media";
import PostContent_Text from "./PostContent_Text";
// ====================================================
function PostContent({ post }: { post: PostDBType }) {
  return (
    <div className="flex flex-col gap-3 mt-4">
      <PostContent_Text post={post} />
      {post.medias.length > 0 && <PostContent_Media post={post} />}
    </div>
  );
}

export default PostContent;
