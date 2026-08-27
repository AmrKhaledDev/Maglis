import Logo from "./_components/Logo";
import SearchBar from "./_components/SearchBar";
import NotificationLink from "./_components/NotificationLink";
import { TvMinimalPlay } from "lucide-react";
import Link from "next/link";
// ========================================
function Header() {
  return (
    <header className="sticky top-0 bg-[#0F0F0F] z-30 py-1 mb-3">
      <div className="mycontainer flex items-center justify-between">
        <Logo />
        <SearchBar />
        <div className="flex items-center gap-5">
          <Link href={"/videos"} className="cursor-pointer">
            <TvMinimalPlay  className="size-6" strokeWidth={1.5}/>
          </Link>
          <NotificationLink />
        </div>
      </div>
    </header>
  );
}

export default Header;
