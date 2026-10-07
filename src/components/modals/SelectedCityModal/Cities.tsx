import { Circle, MapPin, SearchX } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { FaCircleCheck } from "react-icons/fa6";
// ===========================================================
function Cities({
  cities,
  selectedCity,
  setSelectedCity,
}: {
  cities: string[];
  selectedCity: string;
  setSelectedCity: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col gap-2 max-h-100 overflow-y-auto pl-2">
      {cities.length > 0 ? (
        cities.map((city) => (
          <button
            disabled={selectedCity === city}
            type="button"
            onClick={() => setSelectedCity(city)}
            key={city}
            className="flex items-center justify-between  mytransition bg-[#1B1E25] rounded-lg shadow text-gray-100 p-4 not-disabled:cursor-pointer"
          >
            <span className="flex items-center gap-3 font-medium">
              <MapPin
                strokeWidth={2}
                className="p-2 bg-[#B6996A] size-8 rounded-lg text-black"
              />
              {city}
            </span>
            {selectedCity === city ? (
              <FaCircleCheck className="size-6 text-[#b6996a]" />
            ) : (
              <Circle strokeWidth={1} className="text-gray-500" />
            )}
          </button>
        ))
      ) : (
        <div className="flex flex-col items-center gap-3">
          <SearchX className="size-10" strokeWidth={1}/>
          <h3 className="text-xl font-semibold text-white">لا يوجد نتائج</h3>
          <p>تأكد من كتابة اسم المحافظة أو المدينة بشكل صحيح.</p>
        </div>
      )}
    </div>
  );
}

export default Cities;
