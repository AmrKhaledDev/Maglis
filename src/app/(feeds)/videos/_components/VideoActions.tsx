import VideoLikeBtn from "./ButtonsActions/VideoLikeBtn";
import { MessageCircle } from "lucide-react";
import VideoOptions from "./VideoOptions";
import { PostType } from "@/types/Post.type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ar";
import VideoCommentsModal from "./VideoCommentsModal";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import SavePostBtn from "@/components/PostCard/_components/PostActions/SavePostBtn";
// ====================================================================
dayjs.extend(relativeTime).locale("ar");
function VideoActions({ video }: { video: PostType }) {
  const { activeModal, setActiveModal } = useActiveModal();
  return (
    <div className="flex items-center flex-col gap-3">
      <VideoLikeBtn video={video} />
      <button
        onClick={() => setActiveModal(video.authorId)}
        className="videoBtnActionStyle"
      >
        <MessageCircle className="size-7" />
      </button>
      <SavePostBtn
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
