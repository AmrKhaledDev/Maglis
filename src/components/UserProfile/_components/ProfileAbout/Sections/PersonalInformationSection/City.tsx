import { IoMdArrowDropdown } from "react-icons/io";
import EditProfileLable from "../../EditProfileLable";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { FormHookValues } from "@/components/UserProfile/_types/FormHookValues.type";
import SelectCityModal from "./SelectCityModal";
// ======================================================
function City({
  control,
  setValue,
}: {
  control: Control<FormHookValues>;
  setValue: UseFormSetValue<FormHookValues>;
}) {
  const [showSelectCity, setShowSelectCity] = useState(false);
  const city = useWatch({
    control,
    name: "city",
  });
  return (
    <div className="flex flex-col gap-1">
      <EditProfileLable label="الدولة" />
      <div className="w-60">
        <button
          onClick={() => setShowSelectCity(true)}
          type="button"
          className="flex button hover:bg-slate-950 mytransition w-full items-center gap-5 justify-between rounded-lg p-2 bg-slate-900 shadow cursor-pointer"
        >
          {city ? city : "  إختر محافظتك"}
          <IoMdArrowDropdown />
        </button>
        {showSelectCity && (
          <SelectCityModal
            setShowSelectCity={setShowSelectCity}
            setValue={setValue}
            currentCity={city}
          />
        )}
      </div>
    </div>
  );
}

export default City;
