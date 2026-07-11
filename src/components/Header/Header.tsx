import Logo from "./_components/Logo";
import SearchBar from "./_components/SearchBar";
import NotificationLink from "./_components/NotificationLink";
import { TvMinimalPlay } from "lucide-react";
import Link from "next/link";
// ========================================
function Header() {
  return (
    <header className="border-b sticky top-0 bg-linear-to-r from-slate-900 to-slate-800 z-10 border-b-white/5 py-1">
      <div className="mycontainer flex items-center justify-between">
        <Logo />
        <SearchBar />
        <div className="flex items-center gap-5">
          <Link href={"/videos"} className="cursor-pointer">
            <TvMinimalPlay  className="size-6"/>
          </Link>
          <NotificationLink />
        </div>
      </div>
    </header>
  );
}

export default Header;
