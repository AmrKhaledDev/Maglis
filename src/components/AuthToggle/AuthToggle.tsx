import { LucideIcon } from "lucide-react";
import Link from "next/link";
// ============================================
function AuthToggle({
  text,
  linkText,
  href,
  icon: Icon,
}: {
  text: string;
  linkText: string;
  href: string;
  icon?: LucideIcon;
}) {
  return (
    <p className="flex items-center gap-1.5 justify-center text-sm font-normal text-gray-200">
      {text}
      <Link
        className="font-semibold flex items-center gap-1.5 text-xs hover:bg-white/10 mytransition py-1.5 px-4 text-white bg-white/5 ring ring-gray-50/10 rounded-full"
        href={href}
      >
        {Icon && <Icon className="size-4" />}
        {linkText}
      </Link>
    </p>
  );
}

export default AuthToggle;
