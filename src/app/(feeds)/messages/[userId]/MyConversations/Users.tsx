"use client";
import Skeleton from "@/components/Skeletons/MyConversations/Skeleton";
import { useUser } from "@/providers/UserProvider";
import { User } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import UserConversation from "../_types/UserConversations.type";
import UsersFooter from "./UsersFooter";
// ==========================================================================
function Users({
  data,
  receiver,
  isPending
}: {
  data: UserConversation[];
  receiver: User;
  isPending:boolean
}) {
  const userSession = useUser()
  const conversations = [...data].sort((a, b) => {
    const aMessage = a.messages[0];
    const bMessage = b.messages[0];
    const aUnread =
      aMessage.status === "SENT" && aMessage.senderId !== userSession.id;
    const bUnread =
      bMessage.status === "SENT" && bMessage.senderId !== userSession.id;
    if (aUnread && !bUnread) return -1;
    if (!aUnread && bUnread) return 1;
    return 0;
  });
  return (
    <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto pl-2 ">
      {isPending ? (
        <Skeleton />
      ) : (
        conversations &&
        conversations.map((conversation) =>
          conversation.conversationMembers.map((member) => {
            const message = conversation.messages?.[0];
            return (
              <Link
                href={`/messages/${member.user.id}`}
                key={member.user.id}
                className={clsx(
                  "flex items-center gap-2.5 py-2 px-4 relative mytransition rounded",
                  receiver.id === member.user.id
                    ? "bg-white/5 cursor-default"
                    : message.status === "SENT" &&
                        message.senderId !== userSession.id
                      ? "bg-sky-950/60 hover:bg-sky-950/80"
                      : " hover:bg-white/10",
                )}
              >
                <div className="relative xl:size-10 size-8 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={member.user.image || "/user.jpg"}
                    alt="صورة المستخدم"
                    className="object-cover"
                    fill
                  />
                </div>
                <UsersFooter
                  message={message}
                  user={member.user}
                  messageMediaLength={message._count.messageMedia}
                />
                {receiver.id === member.user.id && (
                  <span className="absolute right-0 top-0 h-full w-0.5 bg-sky-500" />
                )}
              </Link>
            );
          }),
        )
      )}
    </div>
  );
}

export default Users;
