import { PostDBType } from "@/types/PostDBType";
import PostContent_Text from "./_components/PostContent_Text";
import PostContent_Media from "./_components/PostContent_Media";
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
