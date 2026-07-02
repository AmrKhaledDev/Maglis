import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// ===========================================================
function LoginHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="relative h-17 w-22">
        <Image src={"/logo.png"} alt="logo" priority fill />
      </div>
      <div className="flex items-center gap-5">
        <Link
          href={"/"}
          className="font-semibold hover:text-gray-200 mytransition text-sm hover:scale-105"
        >
          تسجيل الدخول
        </Link>
        <Link
          href={"/"}
          className=" group hover:bg-[#a08b5f] mytransition bg-[#c5ab77]  flex items-center gap-2 py-2 px-6 font-semibold text-sm rounded-full shadow-[0_0_25px_rgba(197,171,119,0.5)] hover:shadow-none"
        >
          <CircleUserRound className="size-5 group-hover:-translate-y-px mytransition" />{" "}
          إنشاء حساب
        </Link>
      </div>
    </div>
  );
}

export default LoginHeader;
