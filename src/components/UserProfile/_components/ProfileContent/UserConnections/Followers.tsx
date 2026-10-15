import UserConnectionsList from "./UserConnectionsList";
// ===========================================================
function Followers({ userId }: { userId: string }) {
  return <UserConnectionsList userId={userId} connectionType="FOLLOWERS" />;
}

export default Followers;
