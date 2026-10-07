import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ImagePlay, Upload } from "lucide-react";
import Image from "next/image";
import { IoMdPhotos } from "react-icons/io";
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
    <div>
      <label
        htmlFor="upload_media"
        className="text-2xl shadow block text-gray-200 mytransition cursor-pointer p-2.5 hover:bg-white/6 bg-white/4 rounded-full"
      >
        <IoMdPhotos />
      </label>
      <input
        onChange={handleChange}
        type="file"
        id="upload_media"
        className="hidden"
        hidden
        accept="image/*, video/*"
      />
    </div>
  );
}

export default MediaPicker;
