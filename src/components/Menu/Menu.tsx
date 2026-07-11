"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { navLinks } from "@/data/Menu/NavLinks";
// ====================================
function Menu() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-1/2 translate-y-1/2 z-10 right-3 flex-col flex justify-between gap-2 bg-white/10 ring ring-gray-50/20 shadow backdrop-blur-2xl p-2 w-fit rounded-lg">
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
    </nav>
  );
}

export default Menu;
