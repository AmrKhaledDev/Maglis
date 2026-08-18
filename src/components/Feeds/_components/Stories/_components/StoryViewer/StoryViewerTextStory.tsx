import { StoryType } from "@/types/StoryType";
// ==========================================================
function StoryViewerTextStory({ story }: { story: StoryType }) {
  return (
    <div
      className="pointer-events-none h-full w-full flex items-center justify-center p-10"
      style={{
        backgroundColor: story.color ?? "#000",
      }}
    >
      <p className="text-xl [word-break:break-word] line-clamp-12 font-semibold leading-9 text-center whitespace-pre-line">
        {story.contentText}
      </p>
    </div>
  );
}

export default StoryViewerTextStory;
