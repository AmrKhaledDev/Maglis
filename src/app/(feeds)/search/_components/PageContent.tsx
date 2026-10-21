"use client";
import { SearchAction } from "@/actions/Search/Search.action";
import Posts from "@/components/Posts/Posts";
import Skeleton from "@/components/Skeletons/Search/Skeleton";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Header from "./Header";
import UsersResult from "./UsersResult/UsersResult";
import ActiveDataType from "../_types/ActiveData.type";
import UsersFilterType from "../_types/UsersFilters.type";
// =======================================================================
function PageContent() {
  const userSession = useUser();
  const [activeData, setActiveData] = useState<ActiveDataType>("ALL");
  const [userFilter, setUserFilter] = useState<UsersFilterType>("ALL");
  const [searchText, setSearchText] = useState("");
  const { data = { users: [], posts: [] }, isPending } = useQuery({
    queryFn: async () => {
      const result = await SearchAction(searchText);
      if (!result.success) return { users: [], posts: [] };
      return result.data;
    },
    queryKey: ["search", userSession.id, searchText],
    enabled: searchText.trim().length > 0,
  });
  const loading = searchText.trim().length > 0 ? isPending : false;
  const filteredUsers = data.users.filter((user) => {
    if (userFilter === "ALL") return true;
    if (userFilter === "PROFESSIONAL") return user.professionalMode;
    if (userFilter === "NORMAL") return !user.professionalMode;
    if (userFilter === "FRIENDS") {
      return userSession.myFriends.some(
        (friend) => friend.friend.id === user.id,
      );
    }
  });
  return (
    <>
      <Header
        data={data}
        searchText={searchText}
        setSearchText={setSearchText}
        setActiveData={setActiveData}
        activeData={activeData}
        userFilter={userFilter}
        setUserFilter={setUserFilter}
      />
      {(data.users.length > 0 || data.posts.length > 0) && (
        <div className="flex flex-col gap-10">
          {loading ? (
            <Skeleton />
          ) : (
            data.users.length > 0 &&
            activeData != "POSTS" && <UsersResult users={filteredUsers} />
          )}
          {data.posts.length > 0 && activeData != "USERS" && (
            <div>
              <h2 className="mb-4 font-normal">المنشورات</h2>
              <Posts
                isPending={isPending}
                posts={data.posts}
                variant="default"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default PageContent;
