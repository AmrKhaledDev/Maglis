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
    <nav className="sticky top-22 menu h-fit flex-col flex justify-between gap-2 p-3 w-65">
      {filteredLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={clsx(
            "rounded-full mytransition flex items-center gap-3.5 py-1.5 pr-2 text-[17px] font-normal",
            pathname === link.href
              ? "cursor-default bg-white/3 shadow"
              : "active:scale-95 hover:bg-white/2 hover:shadow",
          )}
        >
          <Image
            src={link.icon}
            alt="icon"
            width={100}
            height={100}
            className={clsx("size-9.5", link.style)}
            priority
          />
          {link.title}
        </Link>
      ))}
    </nav>
  );
}

export default Menu;
