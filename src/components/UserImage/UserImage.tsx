import clsx from "clsx";
import Image from "next/image";
// ============================================
function UserImage({
  src,
  size,
  alt,
}: {
  src: string | null;
  size: string;
  alt?: string;
}) {
  return (
    <div
      className={clsx("relative rounded-full overflow-hidden shrink-0", size)}
    >
      <Image
        src={src || "/user_default.jpeg"}
        alt={alt ?? "profile_image"}
        className="object-cover"
        priority
        fill
      />
    </div>
  );
}

export default UserImage;
