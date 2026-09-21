"use client";
import { GoVideo } from "react-icons/go";
import { AddMediaPropsType } from "../../Feeds/_components/CreatePostComposer/_types/AddMediaProps.type";
import clsx from "clsx";
import handleFileUploadCreatePost from "@/lib/helpers/handleFileUploadCreatePost";
// =============================================================
function AddVideos({ append, fields, disabled }: AddMediaPropsType) {
  return (
    <div>
      <label
        htmlFor="upload_video"
        className={clsx(
          "text-2xl text-gray-400 block mytransition",
          !disabled && "hover:text-white cursor-pointer active:scale-90 ",
        )}
      >
        <GoVideo />
      </label>
      <input
        disabled={disabled}
        onChange={(e) => {
          handleFileUploadCreatePost(e, fields, append);
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
