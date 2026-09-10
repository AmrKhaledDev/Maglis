"use client";
import { UserPlus } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ButtonAction from "../ButtonAction";
import NameDescription from "../NameDescription";
import SectionHeader from "../SectionHeader";
// ========================================
function SuggestedGroups() {
  const pathname = usePathname();
  if (pathname === "/videos") return null;
  return (
    <div className="bg-white/2 p-4 shadow rounded-2xl overflow-hidden flex flex-col gap-5">
      <SectionHeader title="مجموعات مقترحة" linkUrl="/" />
      <div className="flex flex-col gap-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-17 h-9 rounded-md overflow-hidden">
                  <Image
                    src="https://imgs.search.brave.com/QRfdjW7R0SbyO8UfhVg2RYBDywb0357gXab2rHFyNtM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L2ZyZWUtcGhvdG8v/d2ViLWhvc3Rpbmct/ZGV2ZWxvcG1lbnQt/Y29ubmVjdGlvbi1u/ZXR3b3JraW5nLWNv/bmNlcHRfNTM4NzYt/MTY1MjU2LmpwZz9z/ZW10PWFpc19oeWJy/aWQmdz03NDAmcT04/MA"
                    alt="صورة المجموعة"
                    fill
                    className="object-cover"
                  />
                </div>
                <NameDescription name="مطورين ويب العرب" description="20 عضو" />
              </div>
              <ButtonAction
                icon={UserPlus}
                name="إنضمام"
                textStyle="text-white"
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default SuggestedGroups;
