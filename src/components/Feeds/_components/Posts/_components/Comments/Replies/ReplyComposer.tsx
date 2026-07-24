import Image from "next/image";
import TextareaAutoResize from "react-textarea-autosize";
import { ImageUp, SendHorizontal } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useUser } from "@/providers/UserProvider";
import { CreateReplyAction } from "@/actions/Reply/CreateReply.action";
import { CommentDbType } from "../../../../../../../types/Comment.type";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import axios from "axios";
// ======================================================================
function ReplyComposer({
  userOwnerCommentName,
  showReplyComposer,
  parentId,
  setShowReplyComposer,
  handleAddReplyLocally,
}: {
  userOwnerCommentName: string;
  showReplyComposer: string;
  parentId: string;
  setShowReplyComposer: Dispatch<SetStateAction<string>>;
  handleAddReplyLocally: (newReply: CommentDbType) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef) {
      textareaRef.current?.focus();
    }
  }, [showReplyComposer]);
  const user = useUser();
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleCreateReply = async () => {
    try {
      setLoading(true);
      setError("");
      if (!content.trim() && !imagePreview)
        return setError("لا يمكنك إنشاء رد فارغ.");
      let imageUrl: { url: string } | null = null;
      if (imageFile) {
        try {
          const formData = new FormData();
          formData.append("file", imageFile);
          const res = await axios.post("/api/upload-media", formData);
          const result = res.data;
          imageUrl = result;
        } catch (error) {
          console.error(error);
          if (axios.isAxiosError(error))
            return setError(
              error.response?.data.error || "حدث خطأ أثناء رفع الصورة.",
            );
          return;
        }
      }
      const result = await CreateReplyAction(parentId, content,imageUrl?.url);
      if (!result.success || !result.newReply)
        return setError("حدث خطأ أثناء إرسال الرد الخاص بك.");
      handleAddReplyLocally(result.newReply);
      setContent("");
      setImageFile(null);
      setImagePreview("");
      setShowReplyComposer("");
    } catch (error) {
      console.error(error);
      setError("حدث خطأ أثناء إرسال الرد الخاص بك.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {error && <AlertMessage message={error} type="error" />}
      <div className="flex gap-1.5 w-full">
        <Image
          src={user.image || "/user.jpg"}
          alt="صورتك"
          width={50}
          height={50}
          className="size-6 rounded-full object-cover shrink-0"
        />
        <div className="border border-white/10 w-1/2 focus-within:border-white/20 mytransition flex flex-col rounded-lg overflow-hidden gap-1">
          <div>
            <TextareaAutoResize
              minRows={1}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              ref={textareaRef}
              placeholder={`رد على ${userOwnerCommentName}`}
              maxRows={3}
              className="w-full outline-none p-2 text-xs resize-none cursor-pointer"
            />
          </div>
          <div className="p-1.5 flex items-center gap-1 justify-end">
            <button
              onClick={handleCreateReply}
              disabled={(!content.trim() && !imagePreview) || loading}
              className="p-1 rounded-full not-disabled:hover:bg-blue-800 w-fit mytransition disabled:bg-gray-400 disabled:text-gray-600 not-disabled:cursor-pointer bg-blue-600"
            >
              <SendHorizontal className="size-3" />
            </button>
            <label
              htmlFor="upload_image_to_reply"
              className="text-gray-300 block cursor-pointer rounded-full hover:text-white mytransition"
            >
              <ImageUp strokeWidth={1.5} className="size-4" />
            </label>
            <input
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setImagePreview(url);
                  setImageFile(file);
                  e.target.value = "";
                }
              }}
              type="file"
              id="upload_image_to_reply"
              hidden
              className="hidden"
            />
          </div>
          {imagePreview && (
            <div className="relative size-30 rounded overflow-hidden m-2">
              <Image
                src={imagePreview}
                alt="صورة للرد"
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReplyComposer;
