import { EditProfileSchema } from "@/zodSchemas/EditProfile/EditProfile.schema";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { IoMdArrowDropdown } from "react-icons/io";
import z from "zod";
import SelectCityModal from "../../../SelectedCityModal/SelectCityModal";
import { MapPin } from "lucide-react";
import Label from "../../Label";
// ======================================================
function City() {
  const { control } = useFormContext<z.infer<typeof EditProfileSchema>>();
  const [showSelectCityModal, setShowSelectCityModal] = useState(false);
  const city = useWatch({
    control,
    name: "city",
  });
  return (
    <div className="flex flex-col gap-1">
      <Label label="الدولة" />
      <div className="w-60">
        <button
          onClick={() => setShowSelectCityModal(true)}
          type="button"
          className="buttonShowSelectGender flex button mytransition w-full items-center gap-5 justify-between rounded-lg p-4 bg-[#252628] hover:bg-[#313235] shadow cursor-pointer font-medium"
        >
          <span className="flex items-center gap-2">
            <MapPin strokeWidth={1} className="size-5" />
            {city ? city : "إختر محافظتك"}
          </span>
          <IoMdArrowDropdown />
        </button>
        {showSelectCityModal && (
          <SelectCityModal
            setShowSelectCityModal={setShowSelectCityModal}
            currentCity={city}
          />
        )}
      </div>
    </div>
  );
}

export default City;
