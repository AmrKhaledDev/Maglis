import { Briefcase, MapPin } from "lucide-react";
import React from "react";
import UserMemberType from "../_types/UserMember.type";
// =====================================================
function UserInfo({ user }: { user: UserMemberType }) {
  const userInfo = [
    {
      id: "city",
      icon: MapPin,
      content: user.city,
    },
    { id: "jobTitle", icon: Briefcase, content: user.jobTitle },
  ];
  return (
    <div className="flex items-center gap-4 mt-1">
      {userInfo.map(
        (info) =>
          info.content && (
            <p
              key={info.id}
              className="flex items-center gap-1.5 text-gray-300 [word-break:break-word]"
            >
              <info.icon strokeWidth={1} className="sm:size-4 size-3.5" />
              <span className="sm:text-xs text-[11px] line-clamp-1">{info.content}</span>
            </p>
          ),
      )}
    </div>
  );
}

export default UserInfo;
