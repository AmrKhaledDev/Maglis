import { PostType } from "@/types/Post.type";
import PostContentMedia from "./PostContentMedia";
import PostContentText from "./PostContentText";
// ====================================================
function PostContent({ post }: { post: PostType }) {
  return (
    <div className="flex flex-col mt-4">
      <PostContentText post={post} />
      {post.medias.length > 0 && <PostContentMedia post={post} />}
    </div>
  );
}

export default PostContent;
