"use client"
import { useUser } from "@/providers/UserProvider";
import Image from "next/image";
// =================================================
function ChatWindowMessages() {
  const userSession = useUser();
  return (
    <div className="w-full py-4 px-2 flex flex-col gap-3 h-full bg-black/20">
      <div className="w-full flex flex-row-reverse items-end gap-2 justify-end">
        <p className="bg-blue-900 rounded-tr-xl rounded-tl-xl rounded-bl-xl shadow max-w-[60%] p-2.5 flex gap-1 flex-col">
          كنت عايز منك براجراف عن التكنولوجيا
          <span className="h-fit text-gray-300 text-xs shrink-0 w-fit">
            11:15ص
          </span>
        </p>
        <div className="relative size-10 shrink-0 rounded-full overflow-hidden">
          <Image
            src={userSession.image || "/user.jpg"}
            alt="صورة المستخدم"
            className="object-cover"
            fill
          />
        </div>
      </div>
      <div className="w-full flex items-end gap-2 justify-end">
        <p className="bg-white/3 rounded-tr-xl  rounded-tl-xl  rounded-br-xl shadow max-w-[55%] p-2 flex items-end flex-col gap-1">
          تمام مفيش مشاكل
          <span className="h-fit text-gray-400 text-xs shrink-0 w-fit">
            11:15ص
          </span>
        </p>
        <div className="relative size-10 shrink-0 rounded-full overflow-hidden">
          <Image
            src="https://imgs.search.brave.com/y9dd1PI7LSH70FeQUFQfZcUS-M_xIbdEQvE8PlRWEpE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L2ZyZWUtcGhvdG8v/aGFuZHNvbWUtY2F1/Y2FzaWFuLW1hbi13/ZWFyaW5nLWNhc3Vh/bC1jbG90aGVzLWds/YXNzZXMtd2l0aC1o/YXBweS1jb29sLXNt/aWxlLWZhY2UtbHVj/a3ktcGVyc29uXzgz/OTgzMy0xMjc3Mi5q/cGc_c2VtdD1haXNf/aHlicmlkJnc9NzQw/JnE9ODA"
            alt="صورة المستخدم"
            className="object-cover"
            fill
          />
        </div>
      </div>
      <div className="w-full flex items-end gap-2 justify-end">
        <p className="bg-white/3 rounded-tr-xl  rounded-tl-xl  rounded-br-xl shadow max-w-[55%] p-2 flex items-end flex-col gap-1">
          بس خليها بعدين كدا علشان والله مش فاضي حالياً
          <span className="h-fit text-gray-400 text-xs shrink-0 w-fit">
            11:15ص
          </span>
        </p>
        <div className="relative size-10 shrink-0 rounded-full overflow-hidden">
          <Image
            src="https://imgs.search.brave.com/y9dd1PI7LSH70FeQUFQfZcUS-M_xIbdEQvE8PlRWEpE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L2ZyZWUtcGhvdG8v/aGFuZHNvbWUtY2F1/Y2FzaWFuLW1hbi13/ZWFyaW5nLWNhc3Vh/bC1jbG90aGVzLWds/YXNzZXMtd2l0aC1o/YXBweS1jb29sLXNt/aWxlLWZhY2UtbHVj/a3ktcGVyc29uXzgz/OTgzMy0xMjc3Mi5q/cGc_c2VtdD1haXNf/aHlicmlkJnc9NzQw/JnE9ODA"
            alt="صورة المستخدم"
            className="object-cover"
            fill
          />
        </div>
      </div>
      <div className="w-full flex flex-row-reverse items-end gap-2 justify-end">
        <p className="bg-blue-900 rounded-tr-xl rounded-tl-xl rounded-bl-xl shadow max-w-[60%] p-2.5 flex gap-1 flex-col">
          خلاص مفيش مشاكل
          <span className="h-fit text-gray-300 text-xs shrink-0 w-fit">
            11:15ص
          </span>
        </p>
        <div className="relative size-10 shrink-0 rounded-full overflow-hidden">
          <Image
            src={userSession.image || "/user.jpg"}
            alt="صورة المستخدم"
            className="object-cover"
            fill
          />
        </div>
      </div>
      <div className="w-full flex flex-row-reverse items-end gap-2 justify-end">
        <p className="bg-blue-900 rounded-tr-xl rounded-tl-xl rounded-bl-xl shadow max-w-[60%] p-2.5 flex gap-1 flex-col">
          يلا سلام.
          <span className="h-fit text-gray-300 text-xs shrink-0 w-fit">
            11:15ص
          </span>
        </p>
        <div className="relative size-10 shrink-0 rounded-full overflow-hidden">
          <Image
            src={userSession.image || "/user.jpg"}
            alt="صورة المستخدم"
            className="object-cover"
            fill
          />
        </div>
      </div>
    </div>
  );
}

export default ChatWindowMessages;
