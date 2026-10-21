import UserImage from "@/components/UserImage/UserImage";
import { formatFollowers } from "@/formats/formatFollowers";
import { SessionWithoutPasswordType } from "@/types/SessionWithoutPassword.type";
import NameDescription from "../NameDescription";
// ================================
function UserDetails({ user }: { user: SessionWithoutPasswordType }) {
  return (
    <div className="flex items-center gap-2.5">
      <UserImage src={user.image} size="size-11" />
      <NameDescription
        name={user.name}
        description={formatFollowers(user.followersCount)}
        userId={user.id}
      />
    </div>
  );
}

export default UserDetails;
