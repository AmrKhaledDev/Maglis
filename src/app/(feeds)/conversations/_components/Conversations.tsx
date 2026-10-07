import UserConversation from "../_types/UserConversations.type";
import UserCard from "./UserCard";
// =======================================================================
function Conversations({
  conversations,
}: {
  conversations: UserConversation[];
}) {
  return (
    <div className="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-4 sm:gap-2 gap-1">
      {conversations.map((conversation) =>
        conversation.conversationMembers.map((member) => (
          <UserCard key={member.user.id} user={member.user} />
        )),
      )}
    </div>
  );
}

export default Conversations;
