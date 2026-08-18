import { getPosts } from "@/cached-queries/getPosts";
import CreatePostComposer from "./_components/CreatePostComposer/CreatePostComposer";
import Posts from "./_components/Posts/Posts";
import Stories from "./_components/Stories/Stories";
import { PostType } from "@/types/Post.type";
// =================================================
async function Feeds() {
  const posts: PostType[] = await getPosts();
  return (
    <div className="flex flex-col max-w-200 gap-7 mx-auto mb-5">
      <Stories />
      <div className="flex flex-col gap-5">
        <CreatePostComposer />
        <Posts posts={posts} />
      </div>
    </div>
  );
}

export default Feeds;