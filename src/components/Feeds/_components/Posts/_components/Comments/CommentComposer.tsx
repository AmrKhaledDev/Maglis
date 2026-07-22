import { useUser } from "@/providers/UserProvider";
import Image from "next/image";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import CommentUploadImage from "./CommentUploadImage";
import CommentImageUploadedPreview from "./CommentImageUploadedPreview";
import axios from "axios";
import { CreateCommentAction } from "@/actions/Comment/CreateComment.action";
import { PostDBType } from "@/types/PostDB.type";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import { Comment } from "@prisma/client";
import { EditCommentAction } from "@/actions/Comment/EditComment.action";
import CommentTextarea from "./CommentTextarea";
import CommentSubmitButton from "./CommentSubmitButton";
// =====================================================
function CommentComposer({
  post,
  currentComment,
  setCurrentComment,
}: {
  post: PostDBType;
  currentComment?: Comment | null;
  setCurrentComment: Dispatch<SetStateAction<Comment | null>>;
}) {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = useUser();
  const currentMessage = currentComment
    ? "حدث خطأ أثناء تعديل تعليقك."
    : "حدث خطأ أثناء إنشاء تعليقك.";
  const handleCreateComment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!content.trim() && !imagePreview)
        return setError("لا يمكنك نشر تعليق فارغ.");
      setLoading(true);
      setError("");
      let imageUrl: { error: string } | { url: string } | null = null;
      if (imageFile) {
        try {
          const formData = new FormData();
          formData.append("file", imageFile);
          formData.append("pathname", "maglis-media");
          const res = await axios.post("/api/upload-media", formData);
          imageUrl = res.data;
        } catch (error) {
          console.error(error);
          if (axios.isAxiosError(error)) {
            return setError(
              error.response?.data.error ?? "حدث خطأ أثناء رفع الصورة.",
            );
          }
        }
      }
      if (imageUrl && "error" in imageUrl)
        return setError("حدث خطأ أثناء رفع الصورة.");
      const action = currentComment
        ? EditCommentAction(currentComment.id, content, imagePreview)
        : CreateCommentAction(post.id, content, imageUrl?.url);
      const result = await action;
      if (!result.success) {
        return setError(result.message || currentMessage);
      }
      setContent("");
      setImageFile(null);
      setImagePreview("");
    } catch (error) {
      console.error(error);
      setError(currentMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {error && <AlertMessage message={error} type="error" />}
      <div className="flex gap-2">
        <Image
          src={user.image ?? "/user.jpg"}
          alt="صورتك"
          width={60}
          height={60}
          className="object-cover size-7 rounded-full shrink-0"
        />
        <div className="border border-white/10 w-full focus:border-white/25 mytransition flex flex-col rounded-lg overflow-hidden gap-1">
          <CommentTextarea
            content={content}
            setContent={setContent}
            setImagePreview={setImagePreview}
            currentComment={currentComment}
            user={user}
            loading={loading}
          />
          <CommentImageUploadedPreview
            imagePreview={imagePreview}
            setImageFile={setImageFile}
            setImagePreview={setImagePreview}
          />
          <form
            onSubmit={handleCreateComment}
            className="flex items-center justify-between w-full p-2"
          >
            <CommentSubmitButton
              loading={loading}
              setCurrentComment={setCurrentComment}
              currentComment={currentComment}
              content={content}
              imagePreview={imagePreview}
            />
            <CommentUploadImage
              setImageFile={setImageFile}
              setImagePreview={setImagePreview}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentComposer;
