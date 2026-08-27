import CommentComposer from "@/components/Comments/CommentComposer/CommentComposer";
import SingleComment from "@/components/Comments/SingleComment/SingleComment";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { Comment } from "@prisma/client";
import { useState } from "react";
import VideoLikeBtn from "./ButtonsActions/VideoLikeBtn";
import PostCard from "@/components/PostCard/PostCard";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { useQuery } from "@tanstack/react-query";
import { GetPostCommentsAction } from "@/actions/Comment/GetPostComments.action";
import { useToast } from "@/providers/ToastProvider";
import SavePostBtn from "@/components/PostCard/_components/PostActions/SavePostBtn";
// ============================================================
function VideoCommentsModal({ video }: { video: PostType }) {
  const { setActiveModal } = useActiveModal();
  const { setToast } = useToast();
  const [currentComment, setCurrentComment] = useState<Comment | null>(null);
  const userSession = useUser();
  const { data: comments = [], isPending } = useQuery({
    queryFn: async () => {
      const result = await GetPostCommentsAction(video.id);
      if (!result.success)
        return setToast({
          open: true,
          message: result.message || "حدث خطأ أثناء جلب تعليقات المنشور.",
          type: "error",
        });
      return result.comments || [];
    },
    queryKey: ["comments", userSession.id],
  });
  const commentsSorted = comments
    ? comments.sort((a, b) => {
        if (a.userId === video.authorId) return -1;
        if (b.userId === video.authorId) return 1;
        return 0;
      })
    : [];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 bg-[#0F0F0F] pt-6  flex items-center justify-center z-40 backdrop-blur-4xl"
    >
      <button
        onClick={() => setActiveModal(null)}
        className="cursor-pointer absolute top-2 right-2 text-gray-400 hover:text-white mytransition"
      >
        <X strokeWidth={1.5} />
      </button>
      <div className="bg-slate-900/0 w-350 h-fit shadow-2xl rounded-xl space-y-5">
        <div className="flex w-full gap-10">
          <div className="w-[45%] flex flex-col">
            <h2 className="text-sm text-gray-300 font-semibold mb-3">
              إضافة تعليق
            </h2>
            <CommentComposer
              post={video}
              currentComment={currentComment}
              setCurrentComment={setCurrentComment}
            />
            <div className="flex flex-col pl-5 mt-4 gap-5 h-125 overflow-y-auto">
              <h3 className=" text-gray-200 text-[17px]">
                التعليقات ({video._count.comments})
              </h3>
              <div className="flex flex-col gap-2">
                {commentsSorted.map((comment) => (
                  <SingleComment
                    key={comment.id}
                    setCurrentComment={setCurrentComment}
                    comment={comment}
                    post={video}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="w-[55%] flex items-center gap-3">
            <div className="flex flex-col gap-3">
              <VideoLikeBtn video={video} isCommentsModalOpen={true} />
              <SavePostBtn
                post={video}
                isCommentsModalOpen={true}
                isVideosPage={true}
              />
            </div>
            <PostCard post={video} isVideosPage={true} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default VideoCommentsModal;
