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
  return (
    <nav className="sticky top-22 menu z-40 h-fit flex-col flex justify-between gap-2 p-3 w-55">
      {filteredLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={clsx(
            "rounded-full mytransition font-sem flex items-center gap-2 py-2 pr-4 pl-10 ring ring-transparent shadow hover:ring-white/4 hover:bg-white/3",
            pathname === link.href
              ? "cursor-default ring ring-white/4 bg-white/3 text-[#c5ab77]"
              : "active:scale-95",
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
