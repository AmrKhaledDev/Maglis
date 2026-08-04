import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ====================================
function SelectCityHeader({
  setShowSelectCity,
}: {
  setShowSelectCity: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">إختر محافظتك</h2>
        <button
          onClick={() => setShowSelectCity(false)}
          className="hover:text-white mytransition cursor-pointer buttonCloseSelectCity"
        >
          <X className="size-5" />
        </button>
      </div>
      <hr className="border-white/5" />
    </div>
  );
}

export default SelectCityHeader;
