import UserImage from "@/components/UserImage/UserImage";
import { User } from "@prisma/client";
import Link from "next/link";
import Options from "./Options/Options";
// ================================================
function Header({ receiver }: { receiver: User }) {
  return (
    <header className="flex items-center gap-3 p-2 bg-[#161717]">
      <UserImage src={receiver.image} size="size-15" />
      <div className="flex items-center justify-between w-full sm:gap-10 gap-5">
        <div>
          <Link
            href={`/u/${receiver.id}`}
            className="sm:text-[18px] font-medium text-gray-300"
          >
            {receiver.name}
          </Link>
          <p className="text-xs text-green-700 font-medium">آخر ظهور الآن</p>
          <p className="text-gray-400 line-clamp-1 sm:text-sm text-xs">
            {receiver.bio}
          </p>
        </div>
        <Options receiver={receiver} />
      </div>
    </header>
  );
}

export default Header;
