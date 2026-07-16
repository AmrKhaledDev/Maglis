"use client";
import { FaRegImages } from "react-icons/fa6";
import { AddMediaPropsType } from "../_types/AddMediaProps.type";
// ======================================================================================
function AddImages({ append, fields, disabled }: AddMediaPropsType) {
  return (
    <div>
      <label
        htmlFor="upload_image"
        className={`text-2xl text-gray-400 block mytransition 
          ${disabled?"" :"hover:text-white cursor-pointer active:scale-90 "}
          `}
      >
        <FaRegImages />
      </label>
      <input
        disabled={disabled}
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
