import { Briefcase, Globe, GraduationCap, Mars } from "lucide-react";
import ButtonEditProfile from "./ButtonEditProfile";
// ======================================================================
function ProfileAbout() {
  return (
    <div className=" w-full flex-1 p-2 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl text-gray-200">معلومات شخصية</h2>
        <ButtonEditProfile />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <p className=" text-gray-400 text-sm">
          نبذه مختصرة :
          <span className="mr-1 text-gray-200">
            عمرو خالد، مطور Full-Stack مهتم بالتعلم والنمو المستمر. أبني تطبيقات
            متطورة بـ Next.js وTypeScript، مع التركيز على الأمن السيبراني
            لحمايتها.
          </span>
        </p>
        <div className="grid grid-cols-2 gap-y-5">
          <div className="flex items-center gap-1.5 text-gray-300 text-xs">
            <Globe className="size-5 p-1 bg-gray-200 text-slate-800 rounded-full" />
            <div className="flex items-center gap-1.5">
              <p className="text-gray-400">يقيم في دولة</p>
              <span className="text-gray-100 font-bold">مصر</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-gray-300 text-xs">
            <Briefcase className="size-5 p-1 bg-gray-200 text-slate-800 rounded-full" />
            <div className="flex items-center gap-1.5">
              <p className="text-gray-400">يعمل</p>
              <span className="text-gray-100 font-bold">مبرمج</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-gray-300 text-xs">
            <Mars className="size-5 p-1 bg-gray-200 text-slate-800 rounded-full" />
            <div className="flex items-center gap-1.5">
              <p className="text-gray-400">الجنس</p>
              <span className="text-gray-100 font-bold">ذكر</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-gray-300 text-xs">
            <GraduationCap className="size-5 p-1 bg-gray-200 text-slate-800 rounded-full" />
            <div className="flex items-center gap-1.5">
              <p className="text-gray-400">التعليم</p>
              <span className="text-gray-100 font-bold">تكنولوجيا التعليم</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileAbout;
