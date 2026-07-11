"use client";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import ReactPlayer from "react-player";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import local from "dayjs/locale/ar";
import { useState } from "react";
// ===================================================================================
dayjs.extend(relativeTime);
dayjs.locale(local);
function Videos() {
  const posts = [
    {
      id: 1,
      username: "أحمد محمد",
      image:
        "https://i.pinimg.com/1200x/f3/f2/15/f3f215326f285a3d254cd597273f48eb.jpg",
      media: "https://youtu.be/VZSF8OEfzls",
      content:
        "الحمد لله خلصت الشغل بدري النهارده وقررت أخرج أتمشى شوية قبل المغرب. الجو كان هادي جدًا والمنظر وقت الغروب كان جميل بشكل يخليك تنسى ضغط اليوم كله. ساعات أبسط اللحظات هي اللي بتفرق فعلًا. ",
      createdAt: new Date(),
      professionalMode: false,
    },
    {
      id: 2,
      username: "محمد علي",
      image:
        "https://i.pinimg.com/736x/de/fe/03/defe0352dcc93a682e244992247f380a.jpg",
      media: "https://youtu.be/nS31q6MAze4",
      content:
        "بدأت أتعلم Next.js من كام يوم، وكل يوم باكتشف حاجات جديدة بتسهل الشغل جدًا. أكتر حاجة عجبتني هي تنظيم المشروع وطريقة التعامل مع الـ App Router. لسه قدامي كتير أتعلمه لكن مستمتع جدًا بالرحلة.",
      createdAt: new Date(),
      professionalMode: true,
    },
    {
      id: 3,
      username: "يوسف خالد",
      image:
        "https://i.pinimg.com/736x/ed/74/5c/ed745c899c6af6d28a0c85a1b6e83bda.jpg",
      media: "https://youtu.be/YZkiE9lkOiw",
      content:
        "بعد فترة طويلة من الكسل رجعت أتمرن من جديد. أول يوم كان صعب جدًا لكن الإحساس بعد التمرين يستحق التعب. الهدف المرة دي إني ألتزم ومفوتش أي تمرين مهما كانت الظروف.",
      createdAt: new Date(),
      professionalMode: true,
    },
    {
      id: 4,
      username: "محمود حسن",
      image:
        "https://i.pinimg.com/736x/89/18/b8/8918b8596eca2e3c53332db5de8811ac.jpg",
      media: "https://youtu.be/q1rDoNVHcP4",
      content:
        "جربت أصور شوية صور بالطبيعة النهارده، وكل مرة باقتنع إن التصوير بيعلمك تركز في التفاصيل الصغيرة اللي ممكن متخدش بالك منها. دي مجموعة من أفضل اللقطات اللي قدرت أصورها.",
      createdAt: new Date(),
      professionalMode: false,
    },
    {
      id: 5,
      username: "عبدالله أحمد",
      image:
        "https://i.pinimg.com/736x/41/f7/0d/41f70deb5af8d1e26814be46057cc691.jpg",
      media: "https://youtu.be/tK-F9oTIvIg",
      content:
        "بقالي فترة بحاول أقلل استخدام السوشيال ميديا وأركز أكتر على القراءة وتطوير نفسي. الموضوع مش سهل لكن فعلًا بدأت أحس إن عندي وقت أكتر أعمل فيه حاجات مفيدة وأتعلم مهارات جديدة.",
      createdAt: new Date(),
      professionalMode: true,
    },
  ];
  return (
    <div className="w-full bg-black min-h-[89vh]">
      <div className="max-w-200 mx-auto p-5 flex flex-col gap-10">
        {posts.map((post) => {
          const [expanded, setExpanded] = useState(false);
          return (
            <div key={post.id} className="flex items-center gap-10">
              <div className="flex items-center flex-col gap-3">
                <button className="cursor-pointer flex items-center gap-1 text-gray-100">
                  <Heart className="size-5 fill-red-500 text-red-500" />
                  <span className="text-sm text-gray-300">1</span>
                </button>
                <button className="cursor-pointer flex items-center gap-1 text-gray-100">
                  <MessageCircle className="size-5" />
                  <span className="text-sm text-gray-300">0</span>
                </button>
                <button className="cursor-pointer flex items-center gap-1 text-gray-100">
                  <Bookmark className="size-5" />
                  <span className="text-sm text-gray-300">0</span>
                </button>
              </div>
              <div className="flex-1 flex flex-col gap-4">
                <div className="space-y-2">
                  <div className="w-full h-80 rounded-md overflow-hidden">
                    <ReactPlayer src={post.media} width="100%" height="100%" />
                  </div>
                  <div className="flex items-end gap-1">
                    <p
                      className={` text-sm text-slate-200 font-semibold ${
                        expanded ? "" : "line-clamp-2"
                      }`}
                    >
                      {post.content}
                    </p>
                    {post.content.length > 200 && (
                      <button
                        onClick={() => setExpanded(!expanded)}
                        className="font-bold cursor-pointer text-sm shrink-0 hover:underline"
                      >
                        {expanded ? "عرض أقل" : "عرض المزيد"}
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src={post.image}
                    alt="صورة المستخدم"
                    width={50}
                    height={50}
                    className="size-10 rounded-full shrink-0 object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold">{post.username}</h2>
                      <span className="size-1 bg-white/20 block rounded-full" />
                      {post.professionalMode ? (
                        <button className="text-xs cursor-pointer border border-blue-500/20 text-blue-400 font-semibold bg-blue-900/40 py-1 px-3 rounded shadow">
                          متابعة
                        </button>
                      ) : (
                        <button className="text-xs rounded font-semibold text-blue-600 bg-white cursor-pointer py-1 px-3 shadow">
                          إضافة صديق
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-300">
                      {dayjs(post.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Videos;
