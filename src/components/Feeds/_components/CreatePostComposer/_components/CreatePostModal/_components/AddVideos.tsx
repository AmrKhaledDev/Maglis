"use client";
import { GoVideo } from "react-icons/go";
import { AddMediaPropsType } from "../_types/AddMediaPropsType";
// =============================================================
function AddVideos({ append, fields }: AddMediaPropsType) {
  return (
    <div>
      <label
        htmlFor="upload_video"
        className="text-2xl text-gray-400 hover:text-white mytransition active:scale-90 cursor-pointer"
      >
        <GoVideo />
      </label>
      <input
        onChange={(e) => {
          if (fields.length >= 4) return;
          const file = e.target.files?.[0];
          if (file) {
            const url = URL.createObjectURL(file);
            append({
              preview: url,
              file,
              type: "video",
            });
          }
        }}
        type="file"
        id="upload_video"
        hidden
        className="hidden"
        accept="video/*"
      />
    </div>
  );
}

export default AddVideos;
