"use client";
import headerNavItems from "@/data/headerNavItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./_components/Logo";
import Search from "./_components/Search";
import clsx from "clsx";
// ========================================
function Header() {
  const pathname = usePathname();
  if (pathname.startsWith("/conversations/")) return null;
  return (
    <header className="sticky top-0 bg-[#090909] z-30 py-3 mb-5 px-10 backdrop-blur-3xl">
      <div className="mycontainer flex items-center justify-between gap-7">
        <div className="flex items-center gap-5">
          <Logo />
          <Search />
        </div>
        <div className="flex items-center gap-5">
          {headerNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex flex-col gap-1 items-center relative mytransition",
                pathname === item.href ? "text-blue-500 cursor-default" : "hover:text-blue-500",
              )}
            >
              <item.icon className="size-6" />
              <span className="font-normal text-xs">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1.5 right-0 size-4 bg-red-700 rounded-full flex items-center justify-center text-xs shadow-lg">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
