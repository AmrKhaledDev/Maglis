"use client";
import { useEffect, useState } from "react";
import MediaPicker from "./_components/MediaPicker";
import MediaPreview from "./_components/MediaPreview";
import CreatePost_Trigger from "./_components/CreatePost_Trigger";
import CreatePost_Modal from "./_components/CreatePost_Modal";
// ==============================================
function CreatePostComposer() {
  const [isOpen, setIsOpen] = useState(false);
  const [media, setMedia] = useState("");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  useEffect(()=>{
    if(isOpen){
      setMedia("")
      setMediaFile(null)
    }
  },[isOpen])
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-7 w-full">
          <CreatePost_Trigger setIsOpen={setIsOpen} />
          <MediaPicker setMedia={setMedia} setMediaFile={setMediaFile} />
        </div>
        <MediaPreview
          media={media}
          mediaFile={mediaFile}
          setMedia={setMedia}
          setMediaFile={setMediaFile}
        />
      </div>
      {isOpen && <CreatePost_Modal setIsOpen={setIsOpen} />}
    </div>
  );
}

export default CreatePostComposer;
