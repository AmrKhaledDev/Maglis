"use client";
import { useState } from "react";
import CreatePostModal from "./_components/CreatePostModal/CreatePostModal";
import CreatePostTrigger from "./_components/CreatePostTrigger";
import MediaPicker from "./_components/MediaPicker";
import MediaPreview from "./_components/MediaPreview/MediaPreview";
// ==============================================
function CreatePostComposer() {
  const [isOpen, setIsOpen] = useState(false);
  const [media, setMedia] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-7 w-full">
          <CreatePostTrigger setIsOpen={setIsOpen} />
          <MediaPicker setMedia={setMedia} setMediaFile={setMediaFile} />
        </div>
        <MediaPreview
          media={media}
          mediaFile={mediaFile}
          setMedia={setMedia}
          setMediaFile={setMediaFile}
        />
      </div>
      {isOpen && <CreatePostModal setIsOpen={setIsOpen} />}
    </div>
  );
}

export default CreatePostComposer;
