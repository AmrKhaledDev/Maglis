import { getPosts } from "@/cached-queries/getPosts";
import CreatePostComposer from "./_components/CreatePostComposer/CreatePostComposer";
import Posts from "./_components/Posts/Posts";
import Stories from "./_components/Stories/Stories";
import { PostsDBType } from "@/types/PostsDBType";
// =================================================
async function Feeds() {
  const posts: PostsDBType[] = await getPosts();
  return (
    <div className="flex flex-col max-w-200 mx-auto">
      <Stories />
      <div className="flex flex-col gap-5">
        <span className="w-full h-px bg-white/3 rounded-full" />
        <CreatePostComposer />
        <Posts posts={posts} />
      </div>
    </div>
  );
}

export default Feeds;
