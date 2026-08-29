import SuggestedPeople from "./SuggestedPeople/SuggestedPeople";
import SuggestedGroups from "./SuggestedGroups/SuggestedGroups";
import RecentContacts from "./RecentContacts/RecentContacts";
// ===================================
function LeftSide() {
  return (
    <aside className="w-87 flex flex-col gap-2 sticky! top-24 mytransition">
      <SuggestedPeople />
      <SuggestedGroups />
      <RecentContacts />
    </aside>
  );
}

export default LeftSide;
