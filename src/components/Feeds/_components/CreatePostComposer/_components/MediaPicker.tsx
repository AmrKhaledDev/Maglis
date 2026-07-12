import { MdOutlinePermMedia } from "react-icons/md";
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
    <div>
      <label
        htmlFor="upload_media"
        className="text-2xl block rounded-full hover:text-white mytransition cursor-pointer text-gray-400"
      >
        <MdOutlinePermMedia />
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
