"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/Menu/NavLinks";
import clsx from "clsx";
// ==========================================================
function Menu() {
  const pathname = usePathname();
  return (
    <nav className="fixed menu bottom-25 z-40 right-5 flex-col flex justify-between gap-5 backdrop-blur-2xl p-3 w-fit rounded-lg">
      {navLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={clsx(
            "rounded-full mytransition font-sem flex items-center gap-2 py-2 pr-4 pl-10 ring ring-transparent shadow hover:ring-white/4 hover:bg-white/3",
            pathname === link.href
              ? "cursor-default ring ring-white/4 bg-white/3"
              : "active:scale-95",
          )}
        >
          <link.icon className="size-5.5" />
          {link.title}
        </Link>
      ))}
    </nav>
  );
}

export default Menu;
