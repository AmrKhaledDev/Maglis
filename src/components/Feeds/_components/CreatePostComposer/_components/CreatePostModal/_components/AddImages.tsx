"use client";
import { FaRegImages } from "react-icons/fa6";
import { AddMediaPropsType } from "../_types/AddMediaPropsType";
// ======================================================================================
function AddImages({ append, fields }: AddMediaPropsType) {
  return (
    <div>
      <label
        htmlFor="upload_image"
        className="text-2xl text-gray-400 hover:text-white block mytransition active:scale-90 cursor-pointer"
      >
        <FaRegImages />
      </label>
      <input
        onChange={(e) => {
          if (fields.length >= 4) return;
          const file = e.target.files?.[0];
          if (file) {
            const url = URL.createObjectURL(file);
            append({
              file,
              preview: url,
              type: "image",
            });
            e.target.value = "";
          }
        }}
        type="file"
        accept="image/*"
        id="upload_image"
        hidden
        className="hidden"
      />
    </div>
  );
}

export default AddImages;
