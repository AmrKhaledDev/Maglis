import { genderMap } from "@/data/genderMap";
import { EditProfileSchema } from "@/ZodSchemas/EditProfile/EditProfile.schema";
import clsx from "clsx";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { IoMdArrowDropdown } from "react-icons/io";
import z from "zod";
import SelectGender from "./SelectGender";
import Label from "../../Label";
// =======================================================
function Gender() {
  const { control } = useFormContext<z.infer<typeof EditProfileSchema>>();
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
      <Label label="الجنس" />
      <div className="relative w-60 ">
        <button
          type="button"
          onClick={() => setShowSelectGender(!showSelectGender)}
          className="buttonShowSelectGender flex button mytransition w-full items-center gap-5 justify-between rounded-lg p-4 bg-[#252628] hover:bg-[#313235] shadow cursor-pointer"
        >
          <span className="flex items-center gap-2 font-medium">
            {genderPreview ? (
              <>
                <genderPreview.icon className="size-5" strokeWidth={1} />
                {genderPreview.label}
              </>
            ) : (
              <>
                <User className="size-5" strokeWidth={1.5} /> أختر الجنس
              </>
            )}
          </span>
          <IoMdArrowDropdown
            className={clsx(showSelectGender && "rotate-180")}
          />
        </button>
        {showSelectGender && <SelectGender gender={gender} />}
      </div>
    </div>
  );
}

export default Gender;
