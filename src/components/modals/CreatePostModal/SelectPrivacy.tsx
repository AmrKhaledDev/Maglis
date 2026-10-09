"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdArrowDropdown } from "react-icons/io";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { CreatePost_ModalFormType } from "../../Feeds/_components/CreatePostComposer/_types/CreatePost_ModalForm.type";
import { privacyOptions } from "@/data/SelectPrivacy/PrivacyOptions";
import clsx from "clsx";
// =======================================================
function SelectPrivacy({
  control,
  setValue,
  disabled,
}: {
  control: Control<CreatePost_ModalFormType, any, CreatePost_ModalFormType>;
  setValue: UseFormSetValue<CreatePost_ModalFormType>;
  disabled: boolean;
}) {
  const selectPrivacy = useWatch({
    control,
    name: "privacy",
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={disabled}
        className="flex rounded-full items-center w-fit space-x-5 justify-between not-disabled:cursor-pointer bg-gray-600/30 ring ring-gray-50/10 py-1.5 px-3 shadow"
      >
        <div className="flex items-center gap-1.5 text-xs">
          <selectPrivacy.icon className="size-4" /> {selectPrivacy.label}
        </div>
        <IoMdArrowDropdown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#14161B]! text-white! shadow-lg! ring! ring-white/5">
        <DropdownMenuLabel>خصوصية المنشور</DropdownMenuLabel>
        <DropdownMenuGroup className="flex flex-col gap-1">
          {privacyOptions.map((option) => (
            <DropdownMenuItem
              className="text-xs! flex items-center justify-between "
              onClick={() => setValue("privacy", option)}
              key={option.value}
            >
              <span className="flex items-center gap-2">
                <option.icon />
                {option.label}
              </span>
              {selectPrivacy.value === option.value && (
                <span className="size-2 bg-sky-500 rounded-full block animate-pulse" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SelectPrivacy;
