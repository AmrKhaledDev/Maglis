"use client"
import { Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
// ========================================
function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col lg:gap-10 sm:gap-5 md:items-start items-center"
    >
      <div className="flex items-center gap-2">
        <div className="relative lg:size-35 size-25">
          <Image
            src="/group_users.png"
            alt="group"
            fill
            className="object-contain"
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-px">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className="fill-amber-400 text-transparent size-4.5"
                />
              ))}
          </div>
          <p className="text-sm font-medium">
            عالم من المتعة والاستكشاف يناديك!
          </p>
        </div>
      </div>
      <h1 className="xl:text-5xl lg:text-4xl text-3xl md:text-start text-center max-w-170 font-extrabold leading-normal">
        ادخل إلى عالمٍ تتلألأ فيه الروابط وتشرق فيه المحادثات.
      </h1>
      <p className="max-w-150 text-gray-200 font-normal md:text-start text-center">
        تواصل، شارك، واكتشف ما يهمك. مكان واحد يجمعك بأصدقائك والأشخاص الذين
        يشاركونك اهتماماتك، لتبقى دائمًا على اتصال بما يحدث من حولك.
      </p>
    </motion.div>
  );
}

export default Hero;
