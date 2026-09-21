import { useQuery } from "@tanstack/react-query";
import { GetUserPostsAction } from "@/actions/User/GetUserPosts.action";
import Posts from "@/components/Posts/Posts";
import { useUser } from "@/providers/UserProvider";
// ======================================================
function UserPosts({ userId }: { userId: string }) {
  const userSession = useUser();
  const { data: posts, isPending } = useQuery({
    queryFn: async () => {
      const result = await GetUserPostsAction(userId);
      if (!result.success || !result.posts) return;
      return result.posts;
    },
    queryKey: ["user_posts", userSession.id, userId],
  });
  return (
    <div className="w-full">
      <Posts posts={posts} isPending={isPending} variant="profile" />
    </div>
  );
}

export default UserPosts;
