import CommentComposer from "@/components/Comments/CommentComposer/CommentComposer";
import SingleComment from "@/components/Comments/SingleComment/SingleComment";
import { useUser } from "@/providers/UserProvider";
import { PostType } from "@/types/Post.type";
import { Comment } from "@prisma/client";
import { useState } from "react";
import VideoLikeBtn from "./ButtonsActions/VideoLikeBtn";
import VideoSaveBtn from "./ButtonsActions/VideoSaveBtn";
import PostCard from "@/components/PostCard/PostCard";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useActiveModal } from "@/providers/ActiveModalProvider";
// ============================================================
function VideoCommentsModal({ video }: { video: PostType }) {
  const { activeModal, setActiveModal } = useActiveModal();
  const [currentComment, setCurrentComment] = useState<Comment | null>(null);
  const userSession = useUser();
  const comments = video.comments.sort((a, b) => {
    if (a.userId === userSession.id) return -1;
    if (b.userId === userSession.id) return 1;
    return 0;
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 bg-black pt-6  flex items-center justify-center z-40 backdrop-blur-4xl"
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
                التعليقات ({video.comments.length})
              </h3>
              <div className="flex flex-col gap-2">
                {comments.map((comment) => (
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
              <VideoSaveBtn video={video} isCommentsModalOpen={true} />
            </div>
            <PostCard post={video} isVideosPage={true} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default VideoCommentsModal;
