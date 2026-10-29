import { Post } from "@/types/Post.type";
import PostContentMedia from "./PostContentMedia";
import PostContentText from "./PostContentText";
// ====================================================
function PostContent({ post }: { post: Post }) {
  return (
    <div className="flex flex-col mt-6">
      <PostContentText post={post} />
      {post.media.length > 0 && <PostContentMedia post={post} />}
    </div>
  );
}

export default PostContent;
