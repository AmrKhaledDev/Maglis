import Image from "next/image";
import Link from "next/link";
// ================================
function Logo() {
  return (
    <Link href={"/"} className="relative h-13 w-15 shrink-0">
      <Image src={"/logo.png"} alt="logo" priority fill />
    </Link>
  );
}

export default Logo;
