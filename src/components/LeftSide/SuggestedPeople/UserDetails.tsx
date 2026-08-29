import Image from "next/image";
import NameDescription from "../NameDescription";
import { SessionWithoutPasswordType } from "@/types/SessionWithoutPassword.type";
import { formatFollowers } from "@/formats/formatFollowers";
// ================================
function UserDetails({ user }: { user: SessionWithoutPasswordType }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative size-11 shrink-0 rounded-full overflow-hidden">
        <Image
          src={user.image || "/user.jpg"}
          alt="صورة المستخدم"
          fill
          className="object-cover"
        />
      </div>
      <NameDescription
        name={user.name}
        description={formatFollowers(user.followersCount)}
      />
    </div>
  );
}

export default UserDetails;
