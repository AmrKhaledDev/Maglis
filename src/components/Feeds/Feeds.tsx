"use client";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Posts from "../Posts/Posts";
import CreatePostComposer from "./_components/CreatePostComposer/CreatePostComposer";
import Stories from "./_components/Stories/Stories";
import { Post } from "@/types/post.type";
// ======================================================================================
function Feeds() {
  const userSession = useUser();
  const { data: posts, isPending } = useQuery({
    queryFn: async () => {
      try {
        const { data } = await axios.get<{ success: boolean; posts: Post[] }>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts`,
          {
            withCredentials: true,
          },
        );
        return data.posts || [];
      } catch (error) {
        console.error(error);
        return [];
      }
    },
    queryKey: ["posts", userSession.id],
  });
  return (
    <div className="pb-4 flex flex-col gap-5">
      <div>
        <Stories />
        <hr className="border-white opacity-2 rounded-full" />
      </div>
      <div className="flex flex-col gap-5">
        <CreatePostComposer />
        <Posts isPending={isPending} posts={posts} variant="default" />
      </div>
    </div>
  );
}

export default Feeds;
