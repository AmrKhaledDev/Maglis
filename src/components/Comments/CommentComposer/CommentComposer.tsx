import { CreateAction } from "@/actions/Comment/Create.action";
import { EditAction } from "@/actions/Comment/Edit.action";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import UserImage from "@/components/UserImage/UserImage";
import { invalidateUserCaches } from "@/lib/invalidateUserCaches";
import { useUser } from "@/providers/UserProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import CommentImageUploadedPreview from "./CommentImageUploadedPreview";
import CommentSubmitButton from "./CommentSubmitButton";
import CommentTextarea from "./CommentTextarea";
import CommentUploadImage from "./CommentUploadImage";
import { Post } from "@/types/Post.type";
import { Comment } from "@/types/Comment.type";
// =====================================================
function CommentComposer({
  post,
  currentComment,
  setCurrentComment,
}: {
  post: Post;
  currentComment?: Comment | null;
  setCurrentComment: Dispatch<SetStateAction<Comment | null>>;
}) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const userSession = useUser();
  const currentMessage = currentComment
    ? "حدث خطأ أثناء تعديل تعليقك."
    : "حدث خطأ أثناء إنشاء تعليقك.";
  const {
    mutate: handleCreateComment,
    isPending: loading,
    error,
  } = useMutation({
    mutationFn: async () => {
      if (!content.trim() && !imagePreview)
        throw new Error("لا يمكنك نشر تعليق فارغ.");
      let imageUrl: { error: string } | { url: string } | null = null;
      if (imageFile) {
        try {
          const formData = new FormData();
          formData.append("file", imageFile);
          const res = await axios.post("/api/upload-media", formData);
          imageUrl = res.data;
        } catch (error) {
          console.error(error);
          if (axios.isAxiosError(error)) {
            throw new Error(
              error.response?.data.error || "حدث خطأ أثناء رفع الصورة.",
            );
          }
        }
      }
      if (imageUrl && "error" in imageUrl)
        throw new Error("حدث خطأ أثناء رفع الصورة.");
      const action = currentComment
        ? EditAction(currentComment.id, content, imagePreview)
        : CreateAction(post.id, content, imageUrl?.url);
      const result = await action;
      if (!result.success) throw new Error(result.message || currentMessage);
    },
    onSuccess: () => {
      setContent("");
      setImageFile(null);
      setImagePreview("");
      setCurrentComment(null);
      invalidateUserCaches(queryClient, userSession);
    },
  });

  return (
    <>
      {!post.commentsDisabled ? (
        <div className="flex flex-col gap-4">
          {error && <AlertMessage message={error.message} type="error" />}
          <div className="flex gap-2">
            <UserImage src={userSession.image} size="size-10"/>
            <div className="border border-white/10 w-full focus-within:border-white/25 mytransition flex flex-col rounded-lg overflow-hidden gap-1">
              <CommentTextarea
                content={content}
                setContent={setContent}
                setImagePreview={setImagePreview}
                currentComment={currentComment}
                user={userSession}
                loading={loading}
              />
              <CommentImageUploadedPreview
                imagePreview={imagePreview}
                setImageFile={setImageFile}
                setImagePreview={setImagePreview}
              />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateComment();
                }}
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
      ) : (
        <AlertMessage
          type="warn"
          message="تم إيقاف ميزة التعليقات على هذا المنشور."
        />
      )}
    </>
  );
}

export default CommentComposer;
