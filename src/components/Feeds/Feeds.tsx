"use client";
import { useQuery } from "@tanstack/react-query";
import CreatePostComposer from "./_components/CreatePostComposer/CreatePostComposer";
import Posts from "../Posts/Posts";
import Stories from "./_components/Stories/Stories";
import { GetPostsAction } from "@/actions/Post/GetPosts.action";
import { useUser } from "@/providers/UserProvider";
// =================================================
function Feeds() {
  const userSession = useUser();
  const { data: posts, isPending } = useQuery({
    queryFn: async () => {
      const result = await GetPostsAction(userSession.id);
      return result.posts || [];
    },
    queryKey: ["posts", userSession.id],
  });
  return (
    <div className="pb-4">
      <Stories />
      <div className="flex flex-col gap-5">
        <CreatePostComposer />
        <Posts isPending={isPending} posts={posts} variant="default" />
      </div>
    </div>
  );
}

export default Feeds;
