"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/Menu/NavLinks";
import clsx from "clsx";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { useUser } from "@/providers/UserProvider";
// ==========================================================
function Menu() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const userSession = useUser();
  const filteredLinks = navLinks.filter((link) =>
    link.isProfessional && !userSession.professionalMode ? false : true,
  );
  if (pathname.startsWith("/conversations")) return null;
  return (
    <nav className="sticky top-26 menu z-40 h-fit flex-col flex justify-between gap-2 p-3 w-70">
      {filteredLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={clsx(
            "rounded-full mytransition font-sem flex items-center gap-2 py-1.5 pr-3",
            pathname === link.href
              ? "cursor-default ring ring-white/4 bg-white/5"
              : "active:scale-95 hover:bg-white/2",
          )}
        >
          <link.icon className="size-5.5" strokeWidth={1.5} />
          {link.title}
        </Link>
      ))}
      <button
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          await signOut();
          setLoading(false);
        }}
        className="flex disabled:cursor-default items-center gap-2 mt-4 mytransition cursor-pointer not-disabled:hover:text-white text-gray-300 pr-4"
      >
        <LogOut className="size-5.5" strokeWidth={1.5} /> تسجيل الخروج
      </button>
    </nav>
  );
}

export default Menu;
