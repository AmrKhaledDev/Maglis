import SavePostButton from "@/components/SavePostButton/SavePostButton";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { PostType } from "@/types/Post.type";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import relativeTime from "dayjs/plugin/relativeTime";
import { MessageCircle } from "lucide-react";
import VideoCommentsModal from "../../../../components/modals/VideoCommentsModal";
import VideoLikeButton from "./ButtonsActions/VideoLikeButton";
import VideoOptions from "./VideoOptions";
// ====================================================================
dayjs.extend(relativeTime).locale("ar");
function VideoActions({ video }: { video: PostType }) {
  const { activeModal, setActiveModal } = useActiveModal();
  const id = [video.id, video.authorId].join("_");
  return (
    <div className="flex items-center flex-col gap-3">
      <VideoLikeButton video={video} variant="default" />
      <button
        onClick={() => setActiveModal(id)}
        className="videoBtnActionStyle"
      >
        <MessageCircle className="size-7" />
      </button>
      <SavePostButton
        post={video}
        isCommentsModalOpen={false}
        buttonStyle="videoBtnActionStyle"
        iconSize="size-7"
      />
      <VideoOptions video={video} />
      {activeModal == id && <VideoCommentsModal video={video} />}
    </div>
  );
}

export default VideoActions;
