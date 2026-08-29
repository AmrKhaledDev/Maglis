"use client"
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import ActionButton from "../ActionButton";
import SectionHeader from "../SectionHeader";
import NameDescription from "../NameDescription";
// ===================================
function RecentContacts() {
  return (
    <div className="p-4 shadow flex flex-col gap-5">
      <SectionHeader title="آخر التواصل" linkUrl="/" />
      <div className="flex flex-col gap-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative size-11 shrink-0 rounded-full overflow-hidden">
                  <Image
                    src="https://imgs.search.brave.com/QRfdjW7R0SbyO8UfhVg2RYBDywb0357gXab2rHFyNtM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L2ZyZWUtcGhvdG8v/d2ViLWhvc3Rpbmct/ZGV2ZWxvcG1lbnQt/Y29ubmVjdGlvbi1u/ZXR3b3JraW5nLWNv/bmNlcHRfNTM4NzYt/MTY1MjU2LmpwZz9z/ZW10PWFpc19oeWJy/aWQmdz03NDAmcT04/MA"
                    alt="صورة المستخدم"
                    fill
                    className="object-cover"
                  />
                </div>
                <NameDescription
                  name="Yaser Tarek"
                  description="      محمد خالد، مطور Full-Stack مهتم بالتعلم والنمو المستمر. أبني
                    تطبيقات متطورة بـ Next.js وTypeScript، مع التركيز على الأمن
                    السيبراني لحمايتها."
                />
              </div>
              <ActionButton
                icon={MessageCircle}
                name="تواصل"
                textStyle="text-green-600"
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecentContacts;
