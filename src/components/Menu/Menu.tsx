"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { navLinks } from "@/data/Menu/NavLinks";
import { StepBack } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
// ==========================================================
function Menu() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".buttonOpenMenu, .menu")) setMenuOpen(false);
      }
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);
  return (
    <div>
      {menuOpen && (
        <motion.nav
          initial={{ opacity: 0, x: 100,scale:0 }}
          animate={{ opacity: 1, x: 0 ,scale:1}}
          transition={{ duration: 0.3 }}
          className="fixed menu bottom-1/2 translate-y-1/2 z-40 right-5 flex-col flex justify-between gap-2 bg-white/10 ring ring-gray-50/20 shadow backdrop-blur-2xl p-2 w-fit rounded-lg"
        >
          {navLinks.map((link) => (
            <Tooltip key={link.id}>
              <TooltipTrigger>
                <Link
                  href={link.href}
                  className={`p-1.5 rounded-full block mytransition 
                ${
                  pathname === link.href
                    ? "bg-[#9e885c] scale-110 cursor-default shadow-[0_0_15px_#9e885c]"
                    : "hover:bg-[#9e885c] hover:shadow-[0_0_15px_#9e885c] hover:scale-110 active:scale-95"
                }
                `}
                >
                  <link.icon className="size-5.5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{link.title}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </motion.nav>
      )}
      <button
        disabled={menuOpen}
        onClick={() => setMenuOpen(true)}
        className="fixed hover:scale-105 z-40 mytransition active:scale-95 buttonOpenMenu disabled:hidden cursor-pointer shadow-[0_0_10px_#87734a] bottom-1/2 translate-y-1/2 right-5 p-1 rounded-full bg-[#87734a] caret-primary-foreground"
      >
        <StepBack className="size-5" />
      </button>
    </div>
  );
}

export default Menu;
