import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
// ====================================
function Header({
  setShowSelectCityModal,
}: {
  setShowSelectCityModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex items-center justify-between text-white">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">إختر المحافظة</h2>
        <p className="text-gray-200 text-sm">سيتم عرض أشخاص من منطقتك.</p>
      </div>
      <button
        onClick={() => setShowSelectCityModal(false)}
        className="hover:text-white mytransition cursor-pointer buttonCloseSelectCity p-2 bg-[#1B1E25] rounded-full text-[#8b92a1]"
      >
        <X className="size-5" strokeWidth={1}/>
      </button>
    </div>
  );
}

export default Header;
