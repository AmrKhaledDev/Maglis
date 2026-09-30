"use client";
import { useUser } from "@/providers/UserProvider";
import Image from "next/image";
// ===============================================================
function Header() {
  const userSession = useUser();
  return (
    <div className="flex items-center gap-2">
      <div className="relative size-9 rounded-full overflow-hidden">
        <Image
          src={userSession.image || "/user.jpg"}
          alt={userSession.name}
          fill
          className="object-cover"
        />
      </div>
      <h1 className="font-medium text-gray-300">محادثاتي</h1>
    </div>
  );
}

export default Header;
