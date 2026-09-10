"use client";
import { GetDirectConversationAction } from "@/actions/Conversation/GetDirectConversation.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import ChatWindowMessagesSkeleton from "./Skeleton";
import Message from "./Message/Message";
import { useEffect } from "react";
import { UpdateMessagesStatus } from "@/actions/Conversation/UpdateMessagesStatus";
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
  return (
    <div className="w-full p-7 flex flex-col gap-3 h-200 overflow-y-auto relative">
      {isPending ? (
        <ChatWindowMessagesSkeleton />
      ) : (
        conversation &&
        conversation.messages.map((message) => (
          <Message key={message.id} message={message} receiverId={receiverId} />
        ))
      )}
    </div>
  );
}

export default Messages;
