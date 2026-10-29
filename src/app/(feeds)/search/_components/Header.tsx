import { Dispatch, SetStateAction } from "react";
import Search from "./Search";
import SearchTypeTabs from "./SearchTypeTabs";
import UsersFiltersTabs from "./UsersFiltersTabs";
import { UserSearchResult } from "@/types/UserSearchResult.type";
import ActiveDataType from "../_types/ActiveData.type";
import UsersFilterType from "../_types/UsersFilters.type";
import { Post } from "@/types/Post.type";
// =======================================================================
function Header({
  searchText,
  setSearchText,
  data,
  setActiveData,
  activeData,
  setUserFilter,
  userFilter,
}: {
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  data: {
    users: UserSearchResult[];
    posts: Post[];
  };
  setActiveData: Dispatch<SetStateAction<ActiveDataType>>;
  activeData: ActiveDataType;
  setUserFilter: Dispatch<SetStateAction<UsersFilterType>>;
  userFilter: UsersFilterType;
}) {
  return (
    <div className="flex flex-col gap-5">
      <Search searchText={searchText} setSearchText={setSearchText} />
      <div className="flex items-center justify-between">
        <SearchTypeTabs
          activeData={activeData}
          setActiveData={setActiveData}
          data={data}
        />
        {activeData !== "POSTS" && (
          <UsersFiltersTabs
            setUserFilter={setUserFilter}
            userFilter={userFilter}
          />
        )}
      </div>
    </div>
  );
}

export default Header;
