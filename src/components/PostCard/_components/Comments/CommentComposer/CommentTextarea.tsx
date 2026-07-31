import { SessionWithoutPasswordType } from "@/types/SessionWithoutPassword.type";
import { Comment } from "@prisma/client";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import TextareaAutoResize from "react-textarea-autosize";
// ===============================================
function CommentTextarea({
  content,
  setContent,
  loading,
  user,
  currentComment,
  setImagePreview,
}: {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  loading: boolean;
  user: SessionWithoutPasswordType;
  currentComment: Comment | null | undefined;
  setImagePreview: Dispatch<SetStateAction<string>>;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (currentComment) {
      setContent(currentComment.content || "");
      setImagePreview(currentComment.image || "");
      textareaRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      textareaRef.current?.focus();
    }
  }, [currentComment]);
  return (
    <TextareaAutoResize
      ref={textareaRef}
      disabled={loading}
      minRows={2}
      placeholder={`مرحبًا ${user.name}، شاركنا رأيك في هذا المنشور`}
      maxRows={5}
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full outline-none p-2 text-sm resize-none"
    />
  );
}

export default CommentTextarea;
