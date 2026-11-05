import AlertMessage from "@/components/AlertMessage/AlertMessage";
import PostCard from "@/components/PostCard/PostCard";
import { Post } from "@/types/post.type";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SinglePostResponse } from "./_types/SinglePostResponse.type";

// =============================================================================
async function SinglePost({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  if (!postId) return redirect("/");
  const cookiesStore = await cookies();
  let post: Post | null = null;
  let message = "تعذر تحميل المنشور.";
  const token = cookiesStore.get("access_token")?.value;
  try {
    const { data } = await axios.get<SinglePostResponse>(
      `${process.env.BACKEND_URL}/posts/${postId}`,
      {
        headers: token ? { Cookie: `access_token=${token}` } : {},
      },
    );
    if (data.post && data.success) {
      post = data.post;
    } else message = data.message || message;
  } catch (error: unknown) {
    console.error("Single Post Error:", error);
    if (axios.isAxiosError<{ message?: unknown }>(error)) {
      const apiMessage = error.response?.data?.message;
      message =
        typeof apiMessage === "string"
          ? apiMessage
          : "حدث خطأ أثناء تحميل المنشور.";
    }
  }
  return (
    <main>
      {!post ? (
        <AlertMessage type="error" message={message} />
      ) : (
        <PostCard post={post} variant="single" />
      )}
    </main>
  );
}

export default SinglePost;
