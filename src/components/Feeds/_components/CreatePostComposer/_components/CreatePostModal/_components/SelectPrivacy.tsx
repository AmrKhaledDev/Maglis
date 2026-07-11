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
import { CreatePost_ModalFormType } from "../_types/CreatePost_ModalFormType";
import { privacyOptions } from "@/data/SelectPrivacy/PrivacyOptions";
// =======================================================
function SelectPrivacy({
  control,
  setValue,
}: {
  control: Control<CreatePost_ModalFormType, any, CreatePost_ModalFormType>;
  setValue: UseFormSetValue<CreatePost_ModalFormType>;
}) {
  const selectPrivacy = useWatch({
    control,
    name: "privacy",
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center w-fit space-x-2.5 justify-between cursor-pointer bg-gray-600/30 ring ring-gray-50/15 p-1.5 shadow rounded">
        <div className="flex items-center gap-1 text-xs">
          <selectPrivacy.icon className="size-4" /> {selectPrivacy.label}
        </div>
        <IoMdArrowDropdown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>خصوصية المنشور</DropdownMenuLabel>
        <DropdownMenuGroup className="flex flex-col gap-1">
          {privacyOptions.map((option) => (
            <DropdownMenuItem
              className={`${selectPrivacy.value === option.value && "bg-white hover:bg-white!"} text-xs!`}
              onClick={() => setValue("privacy", option)}
              key={option.value}
            >
              <option.icon />
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SelectPrivacy;
