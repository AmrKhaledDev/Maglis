import Image from "next/image";
import TextareaAutoResize from "react-textarea-autosize";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useUser } from "@/providers/UserProvider";
import { CreateReplyAction } from "@/actions/Reply/CreateReply.action";
import AlertMessage from "@/components/AlertMessage/AlertMessage";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRepliesState } from "@/providers/RepliesStateProvider";
import { motion } from "framer-motion";
import { EditCommentAction } from "@/actions/Comment/EditComment.action";
import ReplyComposerActions from "./ReplyComposerActions";
import { X } from "lucide-react";
// ===================================================================================
function ReplyComposer({
  userOwnerCommentName,
  parentId,
  setShowRepliesList,
}: {
  userOwnerCommentName: string;
  parentId: string;
  setShowRepliesList: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    showReplyComposer,
    setShowReplyComposer,
    currentReply,
    setCurrentReply,
  } = useRepliesState();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const user = useUser();
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    setContent(currentReply?.content || "");
    setImagePreview(currentReply?.image || "");
  }, [currentReply]);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [showReplyComposer]);

  const { mutate: handleCreateReply, isPending: loading } = useMutation({
    mutationFn: async () => {
      setError("");
      if (!content.trim() && !imagePreview) {
        throw new Error("لا يمكنك إنشاء رد فارغ.");
      }
      let imageUrl: { url: string } | null = null;
      if (imageFile) {
        try {
          const formData = new FormData();
          formData.append("file", imageFile);
          const res = await axios.post("/api/upload-media", formData);
          imageUrl = res.data;
        } catch (err) {
          if (axios.isAxiosError(err)) {
            throw new Error(
              err.response?.data.error || "حدث خطأ أثناء رفع الصورة.",
            );
          }
          throw new Error("حدث خطأ أثناء رفع الصورة.");
        }
      }
      const action = currentReply
        ? EditCommentAction(
            currentReply.id,
            content,
            imageUrl ? imageUrl.url : undefined,
          )
        : CreateReplyAction(parentId, content, imageUrl?.url);
      const result = await action;
      if (!result.success) {
        throw new Error("حدث خطأ أثناء إرسال الرد الخاص بك.");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["replies"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user_posts"],
      });
      setContent("");
      setImageFile(null);
      setImagePreview("");
      setShowReplyComposer("");
      if (!currentReply) setShowRepliesList(true);
      setCurrentReply(null);
    },
    onError: (err: Error) => {
      setError(err.message || "حدث خطأ أثناء إرسال الرد الخاص بك.");
    },
  });
  return (
    <>
      {showReplyComposer === parentId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
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
              <ReplyComposerActions
                content={content}
                currentReply={currentReply}
                setCurrentReply={setCurrentReply}
                handleCreateReply={handleCreateReply}
                imagePreview={imagePreview}
                setImageFile={setImageFile}
                setImagePreview={setImagePreview}
                loading={loading}
              />
              {imagePreview && (
                <div className="flex items-center gap-2">
                  <div className="relative size-30 rounded overflow-hidden m-2">
                    <Image
                      src={imagePreview}
                      alt="صورة للرد"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setImagePreview("");
                      setImageFile(null);
                    }}
                    className="text-gray-400 disabled:hidden hover:text-white mytransition cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default ReplyComposer;
