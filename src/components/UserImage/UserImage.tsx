import clsx from "clsx";
import Image from "next/image";
// ============================================
function UserImage({
  src,
  size,
}: {
  src: string | null;
  size: string;
}) {
  return (
    <div
      className={clsx("relative rounded-full overflow-hidden shrink-0", size)}
    >
      <Image
        src={src || "/user_default.jpeg"}
        alt="صورة المستخدم"
        className="object-cover"
        priority
        fill
      />
    </div>
  );
}

export default UserImage;
