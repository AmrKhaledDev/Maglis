import UserConnectionsList from "./UserConnectionsList";
// ==================================================================
function Friends({ userId }: { userId: string }) {
  return <UserConnectionsList userId={userId} connectionType="FRIENDS" />;
}

export default Friends;
