import PostCard from "@/components/PostCard/PostCard";
import { useState } from "react";
import NoDataMessage from "./NoDataMessage";
import { useQuery } from "@tanstack/react-query";
import { GetUserPostsAction } from "@/actions/User/GetUserPosts.action";
import ProfileLoader from "./ProfileLoader";
// ======================================================
function UserPosts({ userId }: { userId: string }) {
  const [showComments, setShowComments] = useState("");
  const {
    data: posts,
    error,
    isPending,
  } = useQuery({
    queryFn: async () => {
      const result = await GetUserPostsAction(userId);
      if (!result.success || !result.posts)
        throw new Error(
          result.message || "حدث خطأ أثناء جلب المنشورات الخاصة بك.",
        );
      return result.posts;
    },
    queryKey: ["user_posts", userId],
  });
  if (isPending) return <ProfileLoader />;
  return (
    <div className="flex-1 w-full flex flex-col gap-3 justify-center">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            showComments={showComments}
            setShowComments={setShowComments}
            isProfilePage={true}
          />
        ))
      ) : (
        <NoDataMessage
          message={error?.message || "حالياً لا يوجد أي منشورات."}
        />
      )}
    </div>
  );
}

export default UserPosts;
