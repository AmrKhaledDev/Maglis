import { Prisma } from "@prisma/client";
// =======================================
type MessageType = Prisma.MessageGetPayload<{
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
}>;
export default MessageType;
