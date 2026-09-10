import { Prisma } from "@prisma/client";
// =======================================
type ConversationType = Prisma.ConversationGetPayload<{
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
      };
    };
  };
}>;
export default ConversationType;
