import Image from "next/image";
import Link from "next/link";
// ================================
function Logo() {
  return (
    <Link href={"/"} className="relative size-11  shrink-0">
      <Image src={"/faveicon.png"} alt="logo" priority fill className="object-contain"/>
    </Link>
  );
}

export default Logo;
