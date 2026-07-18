import { ChangeEvent } from "react";
import { GoVideo } from "react-icons/go";
// ====================================
function AddVideo({
  handleChange,
  loading,
}: {
  handleChange: (e: ChangeEvent<HTMLInputElement, Element>) => void;
  loading: boolean;
}) {
  return (
    <div>
      <label
        htmlFor="upload_image"
        className={`text-2xl block mytransition 
          
          ${loading ? "text-gray-500 " : "hover:text-white cursor-pointer active:scale-90 text-gray-400 "}
          `}
      >
        <GoVideo />
      </label>
      <input
        onChange={handleChange}
        type="file"
        id="upload_video"
        accept="video/*"
        hidden
        className="hidden"
      />
    </div>
  );
}

export default AddVideo;
