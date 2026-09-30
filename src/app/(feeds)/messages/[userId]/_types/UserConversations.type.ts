import { Prisma } from "@prisma/client";
// ==========================================
type UserConversation = Prisma.ConversationGetPayload<{
  include: {
    conversationMembers: {
      select: {
        user: {
          select: {
            id: true;
            image: true;
            name: true;
          };
        };
      };
    };
    messages: {
      take: 1;
      orderBy: {
        createdAt: "desc";
      };
      include: {
        _count: {
          select: {
            messageMedia: true;
          };
        };
      };
    };
  };
}>;

export default UserConversation