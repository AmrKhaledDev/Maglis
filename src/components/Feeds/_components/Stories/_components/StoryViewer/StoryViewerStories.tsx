import { StoryType } from "@/types/StoryType";
import Stories from "react-insta-stories";
import StoryViewerTextStory from "./StoryViewerTextStory";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import { Dispatch, SetStateAction } from "react";
// =======================================
function StoryViewerStories({
  stories,
  setCurrentIndex,
}: {
  stories: StoryType[];
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}) {
  const storyItems = stories.map((story) => {
    if (story.mediaType === "IMAGE") {
      return {
        url: story.media!,
        type: "image" as const,
        duration: 5000,
      };
    }
    if (story.mediaType === "VIDEO") {
      return {
        url: story.media!,
        type: "video" as const,
      };
    }
    return {
      type: "text",
      storyData: story,
      duration: 5000,
    };
  });
  const textRenderer = {
    tester: (story: any) => ({
      condition: story.type === "text",
      priority: 1,
    }),

    renderer: ({ story }: any) => {
      return <StoryViewerTextStory story={story.storyData} />;
    },
  };
  const { setActiveModal } = useActiveModal();
  return (
    <div className="absolute inset-0 flex items-center justify-center z-1">
      <Stories
        stories={storyItems}
        width="100%"
        height="100%"
        onStoryStart={(index: number, story: any) => {
          console.log("A:", index);
          console.log("B:", story);
          setCurrentIndex(index);
        }}
        storyContainerStyles={{
          backgroundColor: "transparent",
        }}
        renderers={[textRenderer]}
        onAllStoriesEnd={() => {
          setActiveModal(null);
        }}
      />
      <span className="absolute z-2 bg-black/15 inset-0 pointer-events-none"/>
    </div>
  );
}

export default StoryViewerStories;
