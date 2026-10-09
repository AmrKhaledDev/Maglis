import { egyptGovernorates } from "@/data/Profile/egyptGovernorates";
import { Dispatch, SetStateAction, useState } from "react";
import Cities from "./Cities";
import Footer from "./Footer";
import Header from "./Header";
import Search from "./Search";
// =================================================================================
function SelectCityModal({
  setShowSelectCityModal,
  currentCity,
}: {
  setShowSelectCityModal: Dispatch<SetStateAction<boolean>>;
  currentCity: string | undefined;
}) {
  const [cities, setCities] = useState<string[]>(egyptGovernorates);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCity, setSelectedCity] = useState(currentCity ?? "");
  return (
    <div className="fixed bg-black/70 inset-0 flex items-center justify-center">
      <div className="modalBgColor p-4 w-130 rounded-2xl shadow-2xl flex flex-col gap-5 overflow-hidden ring ring-white/10">
        <Header setShowSelectCityModal={setShowSelectCityModal} />
        <div className="flex flex-col gap-10 h-full">
          <Search
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            setCities={setCities}
          />
          <div className="flex flex-col gap-5 h-full">
            <Cities
              cities={cities}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
            <Footer
              selectedCity={selectedCity}
              setShowSelectCityModal={setShowSelectCityModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectCityModal;
