"use client";
import SuggestedPeople from "./SuggestedPeople/SuggestedPeople";
import SuggestedGroups from "./SuggestedGroups/SuggestedGroups";
import RecentContacts from "./RecentContacts/RecentContacts";
import { usePathname } from "next/navigation";
// ===================================
function LeftSide() {
  const pathname = usePathname();
  if (pathname.startsWith("/messages")) return null;
  return (
    <aside className="w-90 flex flex-col gap-2 sticky! top-24 mytransition mr-3">
      <SuggestedPeople />
      {/* <SuggestedGroups />
      <RecentContacts /> */}
    </aside>
  );
}

export default LeftSide;
