import UserConnectionsList from "./UserConnectionsList";
// =====================================================
function Followings({ userId }: { userId: string }) {
  return <UserConnectionsList userId={userId} connectionType="FOLLOWINGS" />;
}

export default Followings;
