import { StoryType } from "@/types/StoryType";
import clsx from "clsx";
import { Eye } from "lucide-react";
// =====================================
function StoryViewers({ story }: { story: StoryType }) {
  return (
    <button
      className={clsx(
        "absolute right-1/2 translate-x-1/2 flex items-center backdrop-blur py-1 px-3 w-15 justify-between bg-white/30 hover:bg-white/35 mytransition cursor-pointer rounded-full shadow z-50",
        story.contentText && story.media ? "bottom-25" : "bottom-5",
      )}
    >
      <Eye /> <span className="font-semibold">2</span>
    </button>
  );
}

export default StoryViewers;
