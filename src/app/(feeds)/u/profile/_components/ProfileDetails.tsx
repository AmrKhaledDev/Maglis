"use client"
import { useUser } from "@/providers/UserProvider";
import { Ban, MessageCircle, UserRoundPlus } from "lucide-react";
import { FaUsers } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
// ==============================================
function ProfileDetails() {
  const user = useUser()
  return (
    <div className="space-y-1.5 mt-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">عمرو خالد عثمان</h2>
          <p className="text-[10px] text-green-600 font-bold">
            آخر ظهور منذ يومين
          </p>
        </div>
        <span className="text-gray-300 font-bold text-[18px]">( مورا )</span>
      </div>
      <h4 className="text-sm text-gray-300">@amr_134</h4>
      <div className="flex items-center gap-4">
        <p className="text-[13px] text-gray-200 flex items-center gap-1.5">
          <FaUsers className="text-[17px] text-gray-300" /> 2300 متابعين
        </p>
        <p className="text-[13px] text-gray-200 flex items-center gap-1.5">
          <HiUsers className="text-[17px] text-gray-300" /> 10 متابعات
        </p>
      </div>
      <div className="mt-6 flex items-center gap-1.5">
        <button className="flex text-xs items-center hover:outline hover:outline-blue-600 outline-offset-2 gap-2 cursor-pointer text-gray-200 font-semibold bg-blue-800 shadow py-1.5 px-3 rounded-full">
          <UserRoundPlus className="size-4" /> طلب صداقة
        </button>
        <button className="flex text-xs items-center hover:outline hover:outline-blue-600 outline-offset-2 gap-2 cursor-pointer text-gray-200 font-semibold bg-blue-800 shadow py-1.5 px-3 rounded-full">
          <MessageCircle className="size-4" />
          تواصل
        </button>
        <button className="flex text-xs mr-3 items-center hover:outline hover:outline-red-600 outline-offset-2 gap-2 cursor-pointer text-red-200 font-semibold bg-red-800 shadow py-1.5 px-3 rounded-full">
          <Ban className="size-4" />
          حظر
        </button>
      </div>
    </div>
  );
}

export default ProfileDetails;
