import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Options from "./Options/Options";
// ================================================
function Header({ receiver }: { receiver: User }) {
  return (
    <div className="flex items-center gap-3 p-2 bg-[#161717]">
      <div className="relative size-11 shrink-0 rounded-full overflow-hidden">
        <Image
          src={receiver.image || "/user.jpg"}
          alt="صورة المستخدم"
          className="object-cover"
          fill
        />
      </div>
      <div className="flex items-center justify-between w-full gap-10">
        <div>
          <Link
            href={`/u/${receiver.id}`}
            className="text-[18px] font-medium text-gray-300"
          >
            {receiver.name}
          </Link>
          <p className="text-xs text-green-700 font-medium">آخر ظهور الآن</p>
          <p className="text-gray-400 line-clamp-1 text-sm">
            {receiver.bio}
          </p>
        </div>
        <Options receiver={receiver} />
      </div>
    </div>
  );
}

export default Header;
