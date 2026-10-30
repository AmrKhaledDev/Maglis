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
    <p className="flex items-center gap-2 justify-center text-xs font-normal text-gray-200 mt-4">
      {text}
      <Link
        className="font-medium flex items-center gap-1.5 hover:bg-white/6 mytransition py-1.5 px-4 text-white bg-white/3 ring ring-gray-50/5 rounded-full"
        href={href}
      >
        {Icon && <Icon className="size-4" />}
        {linkText}
      </Link>
    </p>
  );
}

export default AuthToggle;
