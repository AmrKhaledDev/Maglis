"use client";
import { useUser } from "@/providers/UserProvider";
import Image from "next/image";
// ===============================================================
function Header() {
  const userSession = useUser();
  return (
    <div className="items-center gap-2 xl:flex hidden">
      <div className="relative xl:size-9 size-8 rounded-full overflow-hidden">
        <Image
          src={userSession.image || "/user.jpg"}
          alt={userSession.name}
          fill
          className="object-cover"
        />
      </div>
      <h1 className="font-medium text-gray-300 xl:text-[15px] text-sm">محادثاتي</h1>
    </div>
  );
}

export default Header;
