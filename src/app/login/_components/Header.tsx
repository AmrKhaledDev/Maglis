"use client";
import { UserRoundPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
// ===========================================================
function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between"
    >
      <div className="relative md:size-20 size-15 mt-0.5">
        <Image
          src="/logo.png"
          alt="logo"
          priority
          fill
          className="object-contain"
        />
      </div>
      <Link
        href="/register"
        className="hover:bg-gray-200 mytransition bg-gray-50 text-black flex items-center gap-2 md:py-3 py-2 px-6 font-medium md:text-sm text-xs rounded-lg hover:shadow-lg"
      >
        <UserRoundPlus strokeWidth={1} className="size-5 mytransition" />
        إنشاء حساب
      </Link>
    </motion.header>
  );
}

export default Header;
