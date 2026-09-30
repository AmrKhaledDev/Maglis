"use client";
import { GetRecentContactsAction } from "@/actions/User/GetRecentContacts.action";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import ButtonAction from "../ButtonAction";
import NameDescription from "../NameDescription";
import SectionHeader from "../SectionHeader";
import Skeleton from "@/components/Skeletons/SuggestedPeople/Skeleton";
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
    <div className="p-4 shadow flex flex-col gap-5">
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
                  <div className="relative size-11 shrink-0 rounded-full overflow-hidden">
                    <Image
                      src={member.user.image || "/user.jpg"}
                      alt="صورة المستخدم"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <NameDescription
                    userId={member.user.id}
                    name={member.user.name}
                    description={member.user.bio}
                  />
                </div>
                <ButtonAction
                  icon={MessageCircle}
                  name="تواصل"
                  textStyle="text-green-600"
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
