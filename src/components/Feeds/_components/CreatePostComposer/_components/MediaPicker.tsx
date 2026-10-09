import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
// ================================================================
function MediaPicker({
  setMedia,
  setMediaFile,
}: {
  setMedia: Dispatch<SetStateAction<string>>;
  setMediaFile: Dispatch<SetStateAction<File | null>>;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMedia(url);
      setMediaFile(file);
      e.target.value = "";
    }
  };
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="image"
        className="text-3xl shadow block mytransition cursor-pointer rounded-full relative size-6.5 hover:scale-105 active:scale-95"
      >
        <Image src="/image.png" alt="image icon" fill className="object-contain" />
      </label>
      <input
        onChange={handleChange}
        type="file"
        id="image"
        className="hidden"
        hidden
        accept="image/*"
      />
      <label
        htmlFor="video"
        className="text-3xl shadow block mytransition cursor-pointer rounded-full relative size-6.5 hover:scale-105 active:scale-95"
      >
        <Image src="/video.png" alt="video icon" fill className="object-contain" />
      </label>
      <input
        onChange={handleChange}
        type="file"
        id="video"
        className="hidden"
        hidden
        accept="video/*"
      />
    </div>
  );
}

export default MediaPicker;
