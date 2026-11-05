import PostCard from "@/components/PostCard/PostCard";
import Skeleton from "../Skeletons/Posts/Skeleton";
import { Post } from "@/types/post.type";
// ===================================================================
function Posts({
  posts,
  isPending,
  variant = "default",
}: {
  posts: Post[] | undefined;
  isPending: boolean;
  variant: "default" | "profile" | "videos" | "single";
}) {
  return (
    <>
      {isPending ? (
        <Skeleton />
      ) : (
        <div className="w-full flex flex-col gap-3">
          {posts &&
            posts.map((post) => (
              <PostCard key={post.id} post={post} variant={variant} />
            ))}
        </div>
      )}
    </>
  );
}

export default Posts;
