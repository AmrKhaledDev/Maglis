import { CreateStoryViewer } from "@/actions/Story/CreateStoryViewer.action";
import StoryType from "@/components/Feeds/_types/Story.type";
import { useUser } from "@/providers/UserProvider";
import { UserStory } from "@/types/UserStory.type";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Author from "./Author";
import Navigation from "./Navigation";
import ProgressBar from "./ProgressBar";
import Story from "./Story";
import StoryControls from "./StoryControls/StoryControls";
import StoryMediaBackground from "./StoryMediaBackground";
// ==================================================================================
function StoryViewer({
  user,
  stories,
}: {
  user: UserStory;
  stories: StoryType[];
}) {
  const userSession = useUser();
  const [index, setIndex] = useState(0);
  const story = stories[index] ?? stories[0];
  const [muteStoryVideo, setMuteStoryVideo] = useState("");
  useEffect(() => {
    if (userSession.id === user.id) return;
    const createStoryViewer = async () => {
      const result = await CreateStoryViewer(story.id);
      if (!result.success) alert("Error");
    };
    createStoryViewer();
  }, [story.id, user.id, userSession.id]);
  return createPortal(
    <div
      style={{
        background: !story.media && story.color ? story.color : "#000000",
      }}
      className="fixed z-50 inset-0 backdrop-blur-3xl w-dvw h-screen"
    >
      <div className="w-150 h-full relative mx-auto z-2">
        <div className="absolute top-5 flex flex-col gap-5 w-full px-4 z-100">
          <ProgressBar stories={stories} currentIndex={index} />
          <div className="w-full flex items-center justify-between">
            <Author story={story} user={user} />
            <StoryControls
              story={story}
              muteStoryVideo={muteStoryVideo}
              setMuteStoryVideo={setMuteStoryVideo}
            />
          </div>
        </div>
        <Story story={story} muteStoryVideo={muteStoryVideo} />
      </div>
      <Navigation setIndex={setIndex} stories={stories} />
      <StoryMediaBackground story={story} />
    </div>,
    document.body,
  );
}

export default StoryViewer;
