import AuthToggle from "@/components/AuthToggle/AuthToggle";
import { UserPlus2 } from "lucide-react";
import Link from "next/link";
// ==============================================
function LoginFormFooter() {
  return (
    <div className="flex flex-col gap-3">
      <span className="w-full h-px bg-gray-50/7 block rounded-full" />
      <Link
        href={"/forgot-password"}
        className="block w-fit mx-auto text-center text-xs text-blue-400 hover:underline"
      >
        هل نسيت كلمة المرور؟
      </Link>
      <AuthToggle
        text="ليس لديك حساب؟"
        linkText="أنشئ حسابك الآن"
        href="/register"
        icon={UserPlus2}
      />
    </div>
  );
}

export default LoginFormFooter;
