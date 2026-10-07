"use client";
import { GetConversations } from "@/actions/User/GetConversations.action";
import { useToast } from "@/providers/ToastProvider";
import { useUser } from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";
import { TbLoader4 } from "react-icons/tb";
import Conversations from "./Conversations";
import EmptyConversations from "./EmptyConversations";
import Header from "./Header";
// ===========================================================================
function PageContent() {
  const { setToast } = useToast();
  const userSession = useUser();
  const { data = [], isPending } = useQuery({
    queryFn: async () => {
      const result = await GetConversations();
      if (!result.success) {
        setToast({
          open: true,
          message: result.message || "حدث خطأ غير متوقع أثناء تحميل المحادثه.",
          type: "error",
        });
        return result.conversations;
      }
      return result.conversations;
    },
    queryKey: ["conversations", userSession.id],
  });
  return (
    <div className="mycontainer flex flex-col gap-15">
      {(isPending || data.length > 0) && (
        <Header isPending={isPending} conversationsCount={data.length} />
      )}
      {isPending ? (
        <div className="w-full h-100 flex items-center justify-center ">
          <TbLoader4
            className="size-12 animate-[spin_1.5s_linear_infinite]"
            strokeWidth={1}
          />
        </div>
      ) : data.length > 0 ? (
        <Conversations conversations={data} />
      ) : (
        <EmptyConversations />
      )}
    </div>
  );
}

export default PageContent;
