"use cliet";

import { Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ============================================================
function MediaPreview_Actions({
  setMedia,
  setMediaFile,
}: {
  setMedia: Dispatch<SetStateAction<string>>;
  setMediaFile: Dispatch<SetStateAction<File | null>>;
}) {
  return (
    <div className="flex items-center gap-2">
      <button className="w-fit hover:outline hover:outline-blue-600 outline-offset-2 text-white bg-blue-600 text-xs font-semibold py-2 px-6 cursor-pointer">
        نشر
      </button>
      <button
        onClick={() => {
          setMedia("");
          setMediaFile(null);
        }}
        className="w-fit bg-red-100 text-red-600 hover:outline hover:outline-red-200 outline-offset-2 py-2 px-6 cursor-pointer"
      >
        <Trash className="size-4.5" />
      </button>
    </div>
  );
}

export default MediaPreview_Actions;
