"use client";
import { useUser } from "@/providers/UserProvider";
import Image from "next/image";
import SearhBar from "./SearhBar";
// ===============================================================
function Header() {
  const userSession = useUser();
  return (
    <div className="flex flex-col gap-3 w-full pl-2">
      <div className="flex items-center gap-3">
        <div className="relative size-11 rounded-full overflow-hidden">
          <Image
            src={userSession.image || "/user.jpg"}
            alt={userSession.name}
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-xl font-medium text-gray-300">محادثاتي</h1>
      </div>
      <SearhBar />
    </div>
  );
}

export default Header;
