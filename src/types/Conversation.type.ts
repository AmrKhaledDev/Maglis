import { Prisma } from "@prisma/client";
// =======================================
type Conversation = Prisma.ConversationGetPayload<{
  include: {
    messages: {
      include: {
        sender: {
          select: {
            id: true;
            name: true;
            image: true;
          };
        };
        messageMedia: true;
      };
    };
  };
}>;
export default Conversation;
