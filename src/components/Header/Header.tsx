"use client";
import Logo from "./_components/Logo";
import SearchBar from "./_components/Search";
import NotificationLink from "./_components/NotificationLink";
import { TvMinimalPlay } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "./_components/Search";
// ========================================
function Header() {
  const pathname = usePathname();
  if (pathname.startsWith("/conversations/")) return null;
  return (
    <header className="sticky top-0 bg-[#0c0c0c] z-30 py-3 mb-5 px-25 backdrop-blur-3xl">
      <div className="mycontainer flex items-center justify-between gap-7">
        <Logo />
        <Search />
        <div className="flex items-center gap-3">
          <Link href={"/videos"} className="cursor-pointer">
            <TvMinimalPlay className="size-6" strokeWidth={1} />
          </Link>
          <NotificationLink />
        </div>
      </div>
    </header>
  );
}

export default Header;
