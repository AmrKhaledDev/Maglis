"use client";
import { useUser } from "@/providers/UserProvider";
import { Ellipsis } from "lucide-react";
// ======================================
function Header() {
  const userSession = useUser();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl text-gray-100 flex items-center gap-2">
          طلبات الصداقة ({userSession._count.receiver})
        </h1>
        <button className="cursor-pointer p-1.5 hover:bg-white/5 rounded-full shadow">
          <Ellipsis strokeWidth={1} />
        </button>
      </div>
      <hr className="border-white/2" />
    </div>
  );
}

export default Header;
