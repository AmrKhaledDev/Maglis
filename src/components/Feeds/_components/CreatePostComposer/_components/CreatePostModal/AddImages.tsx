"use client";
import { FaRegImages } from "react-icons/fa6";
import { AddMediaPropsType } from "../../_types/AddMediaProps.type";
import clsx from "clsx";
import handleFileUploadCreatePost from "@/lib/helpers/handleFileUploadCreatePost";
// ======================================================================================
function AddImages({ append, fields, disabled }: AddMediaPropsType) {
  return (
    <div>
      <label
        htmlFor="upload_image"
        className={clsx(
          "text-2xl text-gray-400 block mytransition ",
          !disabled && "hover:text-white cursor-pointer active:scale-90 ",
        )}
      >
        <FaRegImages />
      </label>
      <input
        disabled={disabled}
        onChange={(e) => {
          handleFileUploadCreatePost(e, fields, append);
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
