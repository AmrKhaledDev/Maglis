"use client";
import { privacyOptions } from "@/data/SelectPrivacy/PrivacyOptions";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { IoMdArrowDropdown } from "react-icons/io";
import { FormType } from "./_types/Form.type";
import clsx from "clsx";
// =======================================================
function SelectPrivacy({ disabled }: { disabled: boolean }) {
  const { control, setValue } = useFormContext<FormType>();
  const selectPrivacy = useWatch({
    control,
    name: "privacy",
  });
  const [showPrivacies, setShowPrivacies] = useState(false);
  useEffect(()=>{
    const handle = (e:MouseEvent)=>{
      if(e.target instanceof Element){
        if(!e.target.closest(".buttonOpen")) setShowPrivacies(false)
      }
    }
    document.addEventListener("click",handle)
    return ()=> document.removeEventListener("click",handle)
  },[])
  return (
    <div className="relative w-25">
      <button
        disabled={disabled}
        onClick={() => setShowPrivacies(!showPrivacies)}
        type="button"
        className="menuKeepOpen buttonOpen flex rounded-full items-center w-full justify-between not-disabled:cursor-pointer"
      >
        <span className="flex items-center gap-2 text-sm">
          <selectPrivacy.icon className="size-3.5" /> {selectPrivacy.label}
        </span>
        <IoMdArrowDropdown
          className={clsx("shrink-0", showPrivacies && "rotate-180")}
        />
      </button>
      {showPrivacies && (
        <div className="absolute z-10 bg-gray-800 shadow-lg w-full mt-2 rounded-lg p-2">
          <div className="flex flex-col gap-2">
            {privacyOptions.map((option) => (
              <button
                type="button"
                className={clsx(
                  "flex items-center gap-2 cursor-pointer font-medium rounded text-sm menuKeepOpen",
                  selectPrivacy.value === option.value
                    ? "bg-gray-200 text-black"
                    : "hover:bg-gray-200 hover:text-black",
                )}
                onClick={() => {
                  setValue("privacy", option);
                  setShowPrivacies(false);
                }}
                key={option.value}
              >
                <option.icon className="size-3.5" />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectPrivacy;
