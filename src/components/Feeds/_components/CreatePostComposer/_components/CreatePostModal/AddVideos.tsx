"use client";
import { GoVideo } from "react-icons/go";
import { AddMediaPropsType } from "../../_types/AddMediaProps.type";
// =============================================================
function AddVideos({ append, fields, disabled }: AddMediaPropsType) {
  return (
    <div>
      <label
        htmlFor="upload_video"
        className={`text-2xl text-gray-400 block mytransition 
          ${disabled ? "" : "hover:text-white cursor-pointer active:scale-90 "}
          `}
      >
        <GoVideo />
      </label>
      <input
        disabled={disabled}
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
