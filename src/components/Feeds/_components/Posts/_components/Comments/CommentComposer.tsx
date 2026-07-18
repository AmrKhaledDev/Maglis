import { useUser } from "@/providers/UserProvider";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import TextareaAutoResize from "react-textarea-autosize";
import CommentUploadImage from "./CommentUploadImage";
import CommentImageUploadedPreview from "./CommentImageUploadedPreview";
import axios from "axios";
import { CreateCommentAction } from "@/actions/Comment/CreateComment.action";
import { PostDBType } from "@/types/PostDB.type";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
// =====================================================
function CommentComposer({ post }: { post: PostDBType }) {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = useUser();
  const handleCreateComment = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!content.trim() && !imageFile)
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
      const result = await CreateCommentAction(post.id, content, imageUrl?.url);
      if (!result.success)
        return setError(result.message ?? "حدث خطأ أثناء إنشاء تعليقك.");
      setContent("");
      setImageFile(null);
      setImagePreview("");
    } catch (error) {
      console.error(error);
      setError("حدث خطأ أثناء إنشاء تعليقك.");
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
          <TextareaAutoResize
            disabled={loading}
            minRows={2}
            placeholder={`مرحبًا ${user.name}، شاركنا رأيك في هذا المنشور`}
            maxRows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full outline-none p-2 text-sm resize-none"
          />
          <form onSubmit={handleCreateComment}>
            <div className="flex items-center justify-between w-full ">
              <button
                disabled={(!content.trim() && !imageFile) || loading}
                className="m-2 p-1 rounded-full not-disabled:hover:bg-blue-800 mytransition disabled:bg-gray-400 disabled:text-gray-600 not-disabled:cursor-pointer bg-blue-600"
              >
                <SendHorizontal className="size-4" />
              </button>
              <CommentUploadImage
                setImageFile={setImageFile}
                setImagePreview={setImagePreview}
              />
            </div>
            <CommentImageUploadedPreview
              imageFile={imageFile}
              imagePreview={imagePreview}
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
