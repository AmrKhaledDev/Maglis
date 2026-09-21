"use client";
import { GetDirectConversationAction } from "@/actions/Conversation/GetDirectConversation.action";
import { UpdateMessagesStatus } from "@/actions/Conversation/UpdateMessagesStatus";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { TbLoader4 } from "react-icons/tb";
import Message from "./Message/Message";
import useIsBlocked from "@/hooks/useIsBlocked";

// =================================================================
function Messages({ receiverId }: { receiverId: string }) {
  const userSession = useUser();
  const { setToast } = useToast();
  const { data: conversation, isPending } = useQuery({
    queryFn: async () => {
      const result = await GetDirectConversationAction(receiverId);
      if (!result.success)
        return setToast({
          open: true,
          message: result.message || "حدث خطأ غير متوقع أثناء تحميل المحادثه.",
          type: "error",
        });
      return result.conversation;
    },
    queryKey: ["conversation", userSession.id, receiverId],
  });
  useEffect(() => {
    if (conversation?.id) {
      const update_messages = async () => {
        await UpdateMessagesStatus(receiverId);
      };
      update_messages();
    }
  }, [conversation?.id]);
  const isBlocked = useIsBlocked(receiverId)
  return (
    <div className="w-full p-7 flex-1  flex flex-col gap-2 overflow-y-auto relative">
      {isPending ? (
        <div className="w-full h-full flex items-center  justify-center ">
          <TbLoader4 className="size-12 animate-[spin_1.5s_linear_infinite]" />
        </div>
      ) : (
        <>
          {conversation &&
            conversation.messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                receiverId={receiverId}
              />
            ))}
          {isBlocked && (
            <p className="w-fit mx-auto mt-5 flex items-center gap-2 justify-center py-1 px-5 rounded-full bg-black/50 backdrop-blur-2xl text-white/70">
              لقد حظرت هذا المستخدم. لفك الحظر إضغط على
              <button className="font-medium text-white/90">فك الحظر</button>
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default Messages;
