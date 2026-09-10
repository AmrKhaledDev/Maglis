import SavePostButton from "@/components/PostCard/_components/PostActions/SavePostButton";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { PostType } from "@/types/Post.type";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import { MessageCircle } from "lucide-react";
import VideoLikeButton from "./ButtonsActions/VideoLikeButton";
import VideoCommentsModal from "./VideoCommentsModal";
import VideoOptions from "./VideoOptions";
// ====================================================================
dayjs.extend(relativeTime).locale("ar");
function VideoActions({ video }: { video: PostType }) {
  const { activeModal, setActiveModal } = useActiveModal();
  return (
    <div className="flex items-center flex-col gap-3">
      <VideoLikeButton video={video} />
      <button
        onClick={() => setActiveModal(video.authorId)}
        className="videoBtnActionStyle"
      >
        <MessageCircle className="size-7" />
      </button>
      <SavePostButton
        post={video}
        isCommentsModalOpen={false}
        isVideosPage={true}
      />
      <VideoOptions video={video} />
      {activeModal == video.authorId && <VideoCommentsModal video={video} />}
    </div>
  );
}

export default VideoActions;
