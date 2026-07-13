import { getPosts } from "@/cached-queries/getPosts";
import CreatePostComposer from "./_components/CreatePostComposer/CreatePostComposer";
import Posts from "./_components/Posts/Posts";
import Stories from "./_components/Stories/Stories";
import GetSession from "@/auth/GetSession";
import { redirect } from "next/navigation";
import { UserProvider } from "../../providers/UserProvider";
import { PostDBType } from "@/types/PostDBType";
// =================================================
async function Feeds() {
  const posts: PostDBType[] = await getPosts();
  const session = await GetSession();
  if (!session) return redirect("/login");
  return (
    <UserProvider user={session}>
      <div className="flex flex-col max-w-200 gap-7 mx-auto mb-5">
        <div className="w-full flex flex-col gap-1">
          <Stories />
          <span className="w-full h-px bg-white/3 rounded-full" />
        </div>
        <div className="flex flex-col gap-2">
          <CreatePostComposer />
          <Posts posts={posts} />
        </div>
      </div>
    </UserProvider>
  );
}

export default Feeds;
