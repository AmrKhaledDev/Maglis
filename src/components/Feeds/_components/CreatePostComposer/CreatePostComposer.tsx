"use client";
import { useEffect, useState } from "react";
import MediaPicker from "./_components/MediaPicker";
import MediaPreview from "./_components/MediaPreview/MediaPreview";
import CreatePostTrigger from "./_components/CreatePostTrigger";
import CreatePostModal from "./_components/CreatePostModal/CreatePostModal";
import { useActiveModal } from "@/providers/ActiveModalProvider";
// ==============================================
function CreatePostComposer() {
  const { activeModal } = useActiveModal();
  const [media, setMedia] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  useEffect(() => {
    if (activeModal == "create_post_modal") {
      setMedia("");
      setMediaFile(null);
    }
  }, [activeModal == "create_post_modal"]);
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-7 w-full">
          <CreatePostTrigger />
          <MediaPicker setMedia={setMedia} setMediaFile={setMediaFile} />
        </div>
        <MediaPreview
          media={media}
          mediaFile={mediaFile}
          setMedia={setMedia}
          setMediaFile={setMediaFile}
        />
      </div>
      {activeModal == "create_post_modal" && <CreatePostModal />}
    </div>
  );
}

export default CreatePostComposer;
