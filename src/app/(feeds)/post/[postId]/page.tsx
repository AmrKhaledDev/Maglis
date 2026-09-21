import { GetSinglePostAction } from "@/actions/Post/GetSinglePost.action";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import PostCard from "@/components/PostCard/PostCard";
import { redirect } from "next/navigation";
// =============================================================================
async function SinglePost({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  if (!postId) return redirect("/");
  const result = await GetSinglePostAction(postId);
  return (
    <main>
      {!result.success || !result.post ? (
        <AlertMessage type="error" message={result.message} />
      ) : (
        <PostCard post={result.post} variant="single" />
      )}
    </main>
  );
}

export default SinglePost;
