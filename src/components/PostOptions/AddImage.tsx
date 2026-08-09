import { ChangeEvent } from "react";
import { FaRegImages } from "react-icons/fa6";
// ================================================
function AddImage({
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
          
          ${loading?"text-gray-500 " :"hover:text-white cursor-pointer active:scale-90 text-gray-400 "}
          `}
      >
        <FaRegImages />
      </label>
      <input
        disabled={loading}
        onChange={handleChange}
        type="file"
        id="upload_image"
        accept="image/*"
        hidden
        className="hidden"
      />
    </div>
  );
}

export default AddImage;
