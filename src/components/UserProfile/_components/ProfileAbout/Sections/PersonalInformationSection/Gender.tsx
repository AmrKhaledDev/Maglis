import { useEffect, useState } from "react";
import EditProfileLable from "../../EditProfileLable";
import { SelectedGenderType } from "../../../../_types/SelectedGender.type";
import { IoMdArrowDropdown } from "react-icons/io";
import SelectGender from "./SelectGender";
import { User } from "lucide-react";
import clsx from "clsx";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { FormHookValues } from "../../../../_types/FormHookValues.type";
import { genderMap } from "@/data/genderMap";
// =======================================================
function Gender({
  setValue,
  control,
}: {
  setValue: UseFormSetValue<FormHookValues>;
  control: Control<FormHookValues>;
}) {
  const [selectedGender, setSelectedGender] =
    useState<SelectedGenderType | null>(null);
  const [showSelectGender, setShowSelectGender] = useState(false);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonShowSelectGender, .selectGender"))
          setShowSelectGender(false);
      }
    };
    document.addEventListener("click", handle);
    return () => removeEventListener("click", handle);
  }, []);
  const gender = useWatch({
    control,
    name: "gender",
  });

  const genderPreview = gender && genderMap[gender];
  return (
    <div className="flex flex-col gap-1">
      <EditProfileLable label="الجنس" />
      <div className="relative w-60 ">
        <button
          type="button"
          onClick={() => setShowSelectGender(!showSelectGender)}
          className="buttonShowSelectGender flex button hover:bg-slate-950 mytransition w-full items-center gap-5 justify-between rounded-lg p-2 bg-slate-900 shadow cursor-pointer"
        >
          <span className="flex items-center gap-2 text-sm">
            {genderPreview ? (
              <>
                <genderPreview.icon className="size-5" strokeWidth={1.5} />
                {genderPreview.label}
              </>
            ) : (
              <>
                <User className="size-5" strokeWidth={1.5} /> أختر الجنس
              </>
            )}
          </span>
          <IoMdArrowDropdown
            className={clsx(showSelectGender && "rotate-180 mytransition")}
          />
        </button>
        {showSelectGender && (
          <SelectGender setValue={setValue} gender={gender} />
        )}
      </div>
    </div>
  );
}

export default Gender;
