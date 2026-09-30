import { LuMessageSquareText, LuSearch } from "react-icons/lu";
import UserConversation from "../_types/UserConversations.type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
// =============================================================
function SearhBar({
  data,
  setSearchData,
}: {
  data: UserConversation[];
  setSearchData: Dispatch<SetStateAction<UserConversation[] | null>>;
}) {
  const [searchText, setSearchText] = useState("");
  const handleSearch = () => {
    if (searchText.trim()) {
      setSearchData(
        data.filter((conversation) =>
          conversation.conversationMembers.some((member) =>
            member.user.name.toLowerCase().includes(searchText.toLowerCase()),
          ),
        ),
      );
    }
  };
  return (
    <div className="flex items-center gap-2 flex-1">
      <div className="bg-white/3 h-10 rounded-md overflow-hidden flex items-center w-full gap-2 ring ring-gray-50/5">
        <button className="text-xl text-gray-400 pr-2 mb-0.5">
          <LuSearch strokeWidth={1} />
        </button>
        <input
          value={searchText}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          onChange={(e) => setSearchText(e.target.value)}
          className="h-full w-full outline-none text-gray-200 text-sm"
          type="text"
          placeholder="بحث..."
        />
        <button
          onClick={() => {
            setSearchText("");
            setSearchData(data);
          }}
          className="ml-1.5 cursor-pointer text-gray-400 hover:text-white"
        >
          <X strokeWidth={1} className="size-4" />
        </button>
      </div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleSearch}
        className="p-2 h-10 text-gray-400 bg-white/3 hover:bg-white/5 ring ring-gray-50/5 rounded-md shadow text-xl cursor-pointer"
      >
        <LuMessageSquareText strokeWidth={1} />
      </motion.button>
    </div>
  );
}

export default SearhBar;
