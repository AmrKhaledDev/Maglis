import PostOptionsBox from "@/components/PostOptions/PostOptionsBox";
import { useActiveMenu } from "@/providers/ActiveMenuProvider";
import { PostType } from "@/types/Post.type";
import clsx from "clsx";
import { Ellipsis } from "lucide-react";
// =================================================================================================================================
function VideoOptions({ video }: { video: PostType }) {
  const { activeMenu, setActiveMenu } = useActiveMenu();
  return (
    <div className="relative">
      <button
        onClick={() => setActiveMenu(video.id)}
        className={clsx(
          "cursor-pointer btnActiveMenu mt-2 p-1.5 rounded-full text-gray-300 hover:text-white mytransition",
          activeMenu === video.id && "bg-black/30 shadow",
        )}
      >
        <Ellipsis strokeWidth={1.5} />
      </button>
      <PostOptionsBox activeMenu={activeMenu} post={video} />
    </div>
  );
}

export default VideoOptions;
