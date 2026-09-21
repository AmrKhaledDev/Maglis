import PostCard from "@/components/PostCard/PostCard";
import { PostType } from "@/types/Post.type";
import PostsSkeleton from "./PostsSkeleton";
// ===================================================================
function Posts({
  posts,
  isPending,
  variant = "default",
}: {
  posts: PostType[] | undefined;
  isPending: boolean;
  variant: "default" | "profile" | "videos" | "single";
}) {
  return (
    <>
      {isPending ? (
        <PostsSkeleton />
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
