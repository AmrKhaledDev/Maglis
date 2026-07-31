import { getPosts } from "@/cached-queries/getPosts";
import CreatePostComposer from "./_components/CreatePostComposer/CreatePostComposer";
import Posts from "./_components/Posts/Posts";
import Stories from "./_components/Stories/Stories";
import { PostDBType } from "@/types/PostDB.type";
// =================================================
async function Feeds() {
  const posts: PostDBType[] = await getPosts();
  return (
      <div className="flex flex-col max-w-200 gap-7 mx-auto mb-5">
        <div className="w-full">
          <Stories />
          <hr className="border-white opacity-3"/>
        </div>
        <div className="flex flex-col gap-2">
          <CreatePostComposer />
          <Posts posts={posts} />
        </div>
      </div>
  );
}

export default Feeds;
