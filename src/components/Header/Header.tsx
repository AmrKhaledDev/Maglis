"use client";
import Logo from "./_components/Logo";
import SearchBar from "./_components/SearchBar";
import NotificationLink from "./_components/NotificationLink";
import { TvMinimalPlay } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// ========================================
function Header() {
  const pathname = usePathname();
  if (pathname.startsWith("/messages/")) return null;
  return (
    <header className="sticky top-0 bg-[#0c0c0c] z-30 py-1.5 mb-5 px-25 backdrop-blur-3xl">
      <div className="mycontainer flex items-center justify-between">
        <Logo />
        <SearchBar />
        <div className="flex items-center gap-5">
          <Link href={"/videos"} className="cursor-pointer">
            <TvMinimalPlay className="size-6" strokeWidth={1.5} />
          </Link>
          <NotificationLink />
        </div>
      </div>
    </header>
  );
}

export default Header;
