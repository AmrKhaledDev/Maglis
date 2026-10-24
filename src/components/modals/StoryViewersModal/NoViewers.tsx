import Image from "next/image";

function NoViewers() {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="relative size-27">
        <Image
          src="/empty.png"
          alt="لا يوجد مشاهدين"
          className="animate-pulse"
          priority
          fill
        />
      </div>
      <h2 className="text-gray-300 font-light text-[17px]">
        لا توجد مشاهدات حتى الآن
      </h2>
    </div>
  );
}

export default NoViewers;
