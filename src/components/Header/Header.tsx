"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiUserGroup } from "react-icons/hi2";
import { IoIosNotifications } from "react-icons/io";
import { PiVideoFill } from "react-icons/pi";
import { SiGoogleanalytics } from "react-icons/si";
import Logo from "./_components/Logo";
import Search from "./_components/Search";
// ========================================
function Header() {
  const pathname = usePathname();
  if (pathname.startsWith("/conversations/")) return null;
  return (
    <header className="sticky top-0 bg-[#0c0c0c] z-30 py-3 mb-5 px-25 backdrop-blur-3xl">
      <div className="mycontainer flex items-center justify-between gap-7">
        <div className="flex items-center gap-5">
          <Logo />
          <Search />
        </div>
        <div className="flex items-center gap-5">
          <Link href={"/videos"} className="flex flex-col gap-1.5 items-center">
            <SiGoogleanalytics className="size-6" />
            <span className="font-normal text-xs">التحليلات</span>
          </Link>
          <Link href={""} className="flex flex-col gap-1.5 items-center group">
            <HiUserGroup className="size-6 group-hover:text-gray-300" />
            <span className="font-normal text-xs">شبكتك</span>
          </Link>
          <Link href={"/videos"} className="flex flex-col gap-1.5 items-center">
            <PiVideoFill className="size-6" />
            <span className="font-normal text-xs">الفيديوهات</span>
          </Link>
          <Link href={"/notification"}>
            <div className="relative rounded-full flex items-center justify-center">
              <IoIosNotifications className="size-6" />
              <span className="absolute -top-1.5 right-0 size-4 bg-red-700 rounded-full flex items-center justify-center text-xs shadow-lg">
                1
              </span>
            </div>
            <span className="font-normal text-xs">الإشعارات</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
