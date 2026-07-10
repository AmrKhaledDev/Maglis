"use client";
import { X } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
// ================================================
function CreatePostModal_Head({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <Image
          src={"/my_photo.jpeg"}
          alt="صورتك"
          height={50}
          width={50}
          className="rounded-full size-8 object-cover shrink-0"
        />
        <div>
          <h2 className="text-sm font-bold">عمرو غفر الله له</h2>
          <p className="text-xs text-gray-100">منشور جديد</p>
        </div>
      </div>
      <button
        onClick={() => setIsOpen(false)}
        className="cursor-pointer text-gray-300 hover:text-white mytransition"
      >
        <X className="size-5" />
      </button>
    </div>
  );
}

export default CreatePostModal_Head;
