import { Dispatch, SetStateAction } from "react";
import UsersFilterType from "../_types/UsersFilters.type";
import clsx from "clsx";
// ============================================================
function UsersFiltersTabs({
  setUserFilter,
  userFilter,
}: {
  setUserFilter: Dispatch<SetStateAction<UsersFilterType>>;
  userFilter: UsersFilterType;
}) {
  const tabs = [
    { value: "ALL", label: "الكل" },
    { value: "PROFESSIONAL", label: "وضع احترافي" },
    { value: "NORMAL", label: "وضع عادي" },
    { value: "FRIENDS", label: "أصدقاء" },
  ] as const;
  return (
    <div className="flex items-center gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setUserFilter(tab.value)}
          className={clsx(
            "py-1 cursor-pointer text-sm px-4 rounded-full shadow",
            userFilter === tab.value
              ? "bg-white text-black"
              : "bg-white/5 text-white hover:bg-white/10 mytransition",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default UsersFiltersTabs;
