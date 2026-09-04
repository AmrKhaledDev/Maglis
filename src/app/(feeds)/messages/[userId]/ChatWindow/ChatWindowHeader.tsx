import Image from "next/image";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
// ================================================
function ChatWindowHeader() {
  return (
    <div className="flex items-center gap-3 p-3">
      <div className="relative size-11 shrink-0 rounded-full overflow-hidden">
        <Image
          src="/user.jpg"
          alt="صورة المستخدم"
          className="object-cover"
          fill
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <div>
          <h2 className="text-[18px] font-semibold text-gray-300">أحمد خالد</h2>
          <p className="text-xs text-gray-400">آخر ظهور منذ يومين</p>
        </div>
        <Link
          href={"/"}
          className="text-xl h-fit text-gray-500 hover:text-gray-300"
        >
          <FaArrowLeftLong />
        </Link>
      </div>
    </div>
  );
}

export default ChatWindowHeader;
