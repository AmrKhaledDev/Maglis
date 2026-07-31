"use client"
import { PrivacyType } from "@/types/Privacy.type";
import { PostDBType } from "@/types/PostDB.type";
import Image from "next/image";
import { UseFormSetValue } from "react-hook-form";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";
import { EditPostModalFormType } from "../../_types/EditPostModalForm.type";
import SelectPrivacyOptions from "./SelectPrivacyOptions";
// ====================================================
function EditPostBtnModalAuthor({
  post,
  setValue,
  privacy,
  loading,
}: {
  post: PostDBType;
  setValue: UseFormSetValue<EditPostModalFormType>;
  privacy: PrivacyType;
  loading: boolean;
}) {
  const [showPrivacyOptions, setShowPrivacyOptions] = useState(false);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonShowPrivacyOptions, .boxPrivacyOptions"))
          setShowPrivacyOptions(false);
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  return (
    <div className="flex items-center gap-2 my-5">
      <Image
        src={post.author.image ?? "/user.jpg"}
        alt="صورتك"
        width={50}
        height={50}
        className="rounded-full size-11 shrink-0 object-cover"
      />
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-gray-100">{post.author.name}</h2>
        <div className="relative">
          <button
            disabled={loading}
            onClick={() => setShowPrivacyOptions(!showPrivacyOptions)}
            type="button"
            className="flex buttonShowPrivacyOptions hover:bg-gray-400 mytransition items-center not-disabled:cursor-pointer text-black font-semibold gap-3 bg-gray-300 p-1 rounded-full shadow text-xs"
          >
            <span className="flex items-center gap-1">
              <privacy.icon className="size-4" strokeWidth={1.5} />
              {privacy.label}
            </span>
            <IoMdArrowDropdown />
          </button>
          {showPrivacyOptions && <SelectPrivacyOptions setValue={setValue} privacy={privacy}/>}
        </div>
      </div>
    </div>
  );
}

export default EditPostBtnModalAuthor;
