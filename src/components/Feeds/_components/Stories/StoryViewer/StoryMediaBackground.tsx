import { Story } from "@prisma/client";
import Image from "next/image";
import ReactPlayer from "react-player";
// ======================================
function StoryMediaBackground({ story }: { story: Story }) {
  return (
    <>
      {story.media && (
        <>
          {story.mediaType === "IMAGE" && (
            <Image
              src={story.media}
              alt="صورة"
              fill
              className="object-cover opacity-40 blur-[15px]"
            />
          )}
          {story.mediaType === "VIDEO" && (
            <div className="fixed inset-0 -z-1 opacity-40 blur-[15px]">
              <ReactPlayer
                src={story.media}
                width="100%"
                height="100%"
                className="object-cover"
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default StoryMediaBackground;
