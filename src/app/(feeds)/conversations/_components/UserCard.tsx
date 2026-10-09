import Image from "next/image";
import UserMemberType from "../_types/UserMember.type";
import UserFooterActions from "./UserFooterActions";
import UserHeader from "./UserHeader";
import UserInfo from "./UserInfo";
// =====================================================================
function UserCard({ user }: { user: UserMemberType }) {
  return (
    <div className="sm:p-3 p-2 shadow-lg rounded sm:bg-white/1 bg-white/3 flex flex-col items-center justify-center gap-2">
      <div className="relative md:size-14 sm:size-12 size-10 rounded-full overflow-hidden">
        <Image
          src={user.image || "/user.jpg"}
          alt={user.name}
          className="object-cover"
          fill
        />
      </div>
      <UserHeader user={user} />
      <UserInfo user={user} />
      <UserFooterActions user={user} />
    </div>
  );
}

export default UserCard;
