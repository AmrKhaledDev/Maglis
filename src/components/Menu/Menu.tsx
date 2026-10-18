"use client";
import { navLinks } from "@/data/Menu/NavLinks";
import { useUser } from "@/providers/UserProvider";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// ==========================================================
function Menu() {
  const pathname = usePathname();
  const userSession = useUser();
  const filteredLinks = navLinks.filter((link) =>
    link.isProfessional && !userSession.professionalMode ? false : true,
  );
  if (pathname.startsWith("/conversations")) return null;
  return (
    <nav className="sticky top-26 menu z-40 h-fit flex-col flex justify-between gap-3 p-3 w-70">
      {filteredLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={clsx(
            "rounded-md mytransition flex items-center gap-3.5 py-1.5 pr-2 text-[18px] font-normal",
            pathname === link.href
              ? "cursor-default ring ring-white/4 bg-white/3"
              : "active:scale-95 hover:bg-white/2",
          )}
        >
          <Image
            src={link.icon}
            alt="icon"
            width={100}
            height={100}
            className={clsx("size-10", link.style)}
            priority
          />
          {link.title}
        </Link>
      ))}
    </nav>
  );
}

export default Menu;
