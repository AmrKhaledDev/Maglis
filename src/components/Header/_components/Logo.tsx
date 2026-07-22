import Image from "next/image";
// ================================
function Logo() {
  return (
    <div className="relative h-17 w-20 shrink-0">
      <Image src={"/logo.png"} alt="logo" priority fill />
    </div>
  );
}

export default Logo;
