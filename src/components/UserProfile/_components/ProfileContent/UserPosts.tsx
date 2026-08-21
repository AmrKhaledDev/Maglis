import { useQuery } from "@tanstack/react-query";
import { GetUserPostsAction } from "@/actions/User/GetUserPosts.action";
import Posts from "@/components/Feeds/_components/Posts/Posts";
// ======================================================
function UserPosts({ userId }: { userId: string }) {
  const { data: posts, isPending } = useQuery({
    queryFn: async () => {
      const result = await GetUserPostsAction(userId);
      if (!result.success || !result.posts) return;
      return result.posts;
    },
    queryKey: ["user_posts", userId],
  });
  return (
    <div className="w-full">
      <Posts posts={posts} isPending={isPending} />
    </div>
  );
}

export default UserPosts;
