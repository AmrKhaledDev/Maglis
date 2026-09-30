"use client";
import { GetUserConversations } from "@/actions/User/GetUserConversations";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import SearhBar from "./SearhBar";
import Users from "./Users";
import { useState } from "react";
import UserConversation from "../_types/UserConversations.type";
// ==========================================================================================
function MyConversations({ receiver }: { receiver: User }) {
  const userSession = useUser();
  const { setToast } = useToast();
  const {
    data = [],
    isPending,
    error,
  } = useQuery({
    queryFn: async () => {
      const result = await GetUserConversations();
      if (!result.success) throw new Error(result.message);
      return result.conversations;
    },
    queryKey: ["user_conversations", userSession.id],
  });
  if (error)
    setToast({
      open: true,
      message: error.message,
      type: "error",
    });
  const [searchData, setSearchData] = useState<UserConversation[] | null>(null);
  return (
    <aside className="xl:w-83 w-75 gap-5 flex-col pt-5 lg:flex hidden">
      <div className="flex items-center gap-3">
        <Header />
        <SearhBar data={data} setSearchData={setSearchData} />
      </div>
      <Users
        data={searchData ?? data}
        receiver={receiver}
        isPending={isPending}
      />
    </aside>
  );
}

export default MyConversations;
