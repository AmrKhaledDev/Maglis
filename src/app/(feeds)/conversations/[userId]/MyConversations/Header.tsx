"use client";
import UserImage from "@/components/UserImage/UserImage";
import { useUser } from "@/providers/UserProvider";
// ===============================================================
function Header() {
  const userSession = useUser();
  return (
    <header className="items-center gap-2 xl:flex hidden">
      <UserImage
        src={userSession.image}
        size="xl:size-9 size-8"
        alt={userSession.name}
      />
      <h1 className="font-medium text-gray-300 xl:text-[15px] text-sm">
        محادثاتي
      </h1>
    </header>
  );
}

export default Header;
