import { egyptGovernorates } from "@/data/Profile/egyptGovernorates";
import { EditProfileSchema } from "@/ZodSchemas/EditProfile/EditProfile.schema";
import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import z from "zod";
// ==============================================================================================
function Footer({
  selectedCity,
  setShowSelectCityModal,
}: {
  selectedCity: string;
  setShowSelectCityModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { setValue } = useFormContext<z.infer<typeof EditProfileSchema>>();
  return (
    <div className="flex items-center justify-between">
      <p>{egyptGovernorates.length} محافظة</p>
      <div className="flex items-center gap-5">
        <button
          onClick={() => setShowSelectCityModal(false)}
          className="hover:text-white cursor-pointer"
        >
          إلغاء
        </button>
        <button
          onClick={() => {
            setValue("city", selectedCity);
            setShowSelectCityModal(false);
          }}
          className="py-3 px-6 bg-[#b6996a] hover:bg-[#cbac7a] text-black font-semibold rounded-xl shadow cursor-pointer"
        >
          تأكيد
        </button>
      </div>
    </div>
  );
}

export default Footer;
