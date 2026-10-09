import { ImSpinner } from "react-icons/im";
import { Josefin_Sans } from "next/font/google";
import clsx from "clsx";
import Image from "next/image";
// ================================================
const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
function Loading() {
  return (
    <div className="fixed inset-0 modalBgColor flex flex-col z-300 justify-center items-center gap-3.5">
      <div className="relative size-32">
        <Image
          src="/logo.png"
          alt="logo"
          fill
          priority
          className="object-contain"
        />
      </div>
      <ImSpinner
        className="size-9 animate-[spin_1.1s_linear_infinite]"
        strokeWidth={0}
      />
      <p className="font-normal">جاري التحميل...</p>
      <div className="absolute bottom-5 flex flex-col items-center gap-1">
        <p className={clsx("text-sm opacity-70", josefin_sans.className)}>
          from
        </p>
        <p className={clsx("font-bold", josefin_sans.className)}>Amr Khaled</p>
      </div>
    </div>
  );
}

export default Loading;
