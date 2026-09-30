import MyConversations from "./MyConversations/MyConversations";
import ChatWindow from "./ChatWindow/ChatWindow";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
// ==============================================
async function Chat({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  if (!userId) return redirect("/");
  const receiver = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!receiver) return redirect("/");
  return (
    <main className="h-screen flex gap-5">
      <MyConversations receiver={receiver}/>
      <ChatWindow receiver={receiver} />
    </main>
  );
}

export default Chat;
