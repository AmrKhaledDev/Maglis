"use client";
import SuggestedPeople from "./SuggestedPeople/SuggestedPeople";
import RecentContacts from "./RecentContacts/RecentContacts";
import { usePathname } from "next/navigation";
// ================================================================
function LeftSide() {
  const pathname = usePathname();
  if (pathname.startsWith("/conversations")) return null;
  return (
    <aside className="w-74 flex flex-col gap-10 sticky! top-26 mytransition">
      <SuggestedPeople />
      {/* <SuggestedGroups /> */}
      <RecentContacts />
    </aside>
  );
}

export default LeftSide;
