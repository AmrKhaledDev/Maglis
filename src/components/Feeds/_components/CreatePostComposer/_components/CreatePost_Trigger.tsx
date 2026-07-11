"use client";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
// ================================================================
function CreatePost_Trigger({setIsOpen}:{setIsOpen:Dispatch<SetStateAction<boolean>>}) {
  return (
    <div className="flex items-center gap-2 w-full">
      <Image
        src={"/my_photo.jpeg"}
        alt="صورتك"
        width={50}
        height={50}
        className="size-9 shrink-0 rounded-full object-cover"
      />
      <button
        onClick={() => setIsOpen(true)}
        className="p-3.5 flex-1 hover:border-gray-50/40 mytransition rounded-full border border-gray-50/20 text-gray-400 font-semibold cursor-pointer text-start"
      >
        بماذا تفكر اليوم؟
      </button>
    </div>
  );
}

export default CreatePost_Trigger;
