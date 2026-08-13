import { egyptGovernorates } from "@/data/Profile/egyptGovernorates";
import { CircleCheck, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FormHookValues } from "../../../../_types/FormHookValues.type";
import SelectCityHeader from "./SelectCityHeader";
import SelectCitySearchBar from "./SelectCitySearchbar";
// =================================================================================
function SelectCityModal({
  setShowSelectCity,
  currentCity,
  setValue,
}: {
  setShowSelectCity: Dispatch<SetStateAction<boolean>>;
  currentCity: string | undefined;
  setValue: UseFormSetValue<FormHookValues>;
}) {
  const [cities, setCities] = useState<string[]>(egyptGovernorates);
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="fixed bg-black/70 inset-0 flex items-center justify-center">
        <div className="bg-slate-800 p-4 w-150 overflow-y-auto rounded max-h-150 shadow-2xl flex flex-col gap-5">
          <SelectCityHeader setShowSelectCity={setShowSelectCity} />
          <div className="flex flex-col gap-10">
            <SelectCitySearchBar
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              setCities={setCities}
            />
            <div className="flex flex-col gap-5">
              <h2 className="text-[17px] text-gray-300 font-semibold">
                المحافظات :
              </h2>
              <div className="flex flex-col gap-3">
                {cities.map((city) => (
                  <button
                    disabled={currentCity === city}
                    type="button"
                    onClick={() => setValue("city", city)}
                    key={city}
                    className="hover:bg-slate-900 flex items-center  justify-between disabled:bg-slate-900  text-sm mytransition bg-slate-700 rounded shadow text-gray-100 py-2 px-6 not-disabled:cursor-pointer font-semibold"
                  >
                    {city}
                    {currentCity == city && <CircleCheck className="size-4" />}
                  </button>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default SelectCityModal;
