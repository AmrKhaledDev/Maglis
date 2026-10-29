"use client";
import { GetRecentContactsAction } from "@/actions/User/GetRecentContacts.action";
import Skeleton from "@/components/Skeletons/LeftSide/Skeleton";
import UserImage from "@/components/UserImage/UserImage";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import ButtonAction from "../ButtonAction";
import NameDescription from "../NameDescription";
import SectionHeader from "../SectionHeader";
// =================================================================================
function RecentContacts() {
  const userSession = useUser();
  const { data = [], isPending } = useQuery({
    queryFn: async () => {
      const result = await GetRecentContactsAction();
      if (!result.success) throw new Error(result.message);
      return result.conversations;
    },
    queryKey: ["user_recent_contacts", userSession.id],
  });
  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        title="آخر التواصل"
        linkUrl="/"
        isPending={isPending}
        dataLength={data.length}
      />
      <div className="flex flex-col gap-3">
        {isPending ? (
          <Skeleton />
        ) : (
          data.map((conversation) =>
            conversation.conversationMembers.map((member) => (
              <div
                key={member.user.id}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5">
                  <UserImage src={member.user.image} size="size-11" />
                  <NameDescription
                    userId={member.user.id}
                    name={member.user.name}
                    description={conversation.messages[0].content}
                  />
                </div>
                <ButtonAction
                  icon={MessageCircle}
                  name="تواصل"
                  style="text-green-600 text-xs"
                  iconStyle="size-4"
                  id={member.user.id}
                />
              </div>
            )),
          )
        )}
      </div>
    </div>
  );
}

export default RecentContacts;
