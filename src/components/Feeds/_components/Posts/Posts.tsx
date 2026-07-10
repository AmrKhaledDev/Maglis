"use client";
import PostAuthor from "./_components/PostAuthor";
import PostContent from "./_components/PostContent";
import PostActions from "./_components/PostActions";
import PostOptions from "./_components/PostOptions";
import { useState } from "react";
// ===================================================================
function Posts() {
  const postsList = [
    {
      id: "1",
      userName: "عمرو خالد",
      userImage: "/my_photo.jpeg",
      content:
        "التحدي الحقيقي في بناء المنصات الكبيرة مش بس كتابة الكود، بل في كيفية هندسة البيانات والتفكير في تجربة المستخدم قبل أي سطر برمجيات.",
      createdAt: "2026-07-03T21:30:00Z", // جاهز للتحويل بـ day.js
      media:
        "https://i.pinimg.com/736x/7a/1c/39/7a1c3995916963effe9bfc1928609224.jpg",
      mediaType: "image",
    },
    {
      id: "2",
      userName: "أحمد المصراتي",
      userImage: "/my_photo.jpeg",
      content:
        "كلما تعمقت في الـ Full Stack، أدركت أن سرعة الموقع والـ Performance هي الواجهة الحقيقية للاحترافية. الـ Clean Code يظهر أثره في تجربة العميل.",
      createdAt: "2026-07-02T18:45:00Z",
      media: "https://www.youtube.com/watch?v=xeSPUQVNBRA&t=2590s",
      mediaType: "video",
    },
    {
      id: "3",
      userName: "سارة المهدي",
      userImage: "/my_photo.jpeg",
      content:
        "الألوان الهادئة والـ Dark Mode مش مجرد رفاهية، دي عوامل أساسية لراحة عين المستخدم اللي بيقضي ساعات طويلة قدام الشاشة. دائمًا صمم بوعي.",
      createdAt: "2026-07-01T14:15:00Z",
    },
    {
      id: "4",
      userName: "محمود عبد الرحمن",
      userImage: "/my_photo.jpeg",
      content:
        "في عالم الويب، الأمان لازم يكون مبني من أول يوم مش مجرد طبقة بنضيفها في الآخر. حماية بيانات المستخدمين هي أولويتنا الأولى كـ Developers.",
      createdAt: "2026-06-30T09:00:00Z",
    },
    {
      id: "5",
      userName: "يوسف الكناني",
      userImage: "/my_photo.jpeg",
      content:
        "الاستمرارية والتعلم اليومي هما اللي بيصنعوا الفارق. ابدأ بمشروع صغير، كبره، واجه المشاكل وحلها، ده الطريق الوحيد للوصول لمستوى الـ Senior.",
      createdAt: "2026-06-29T11:20:00Z",
    },
  ];
  const [showOptions, setShowOptions] = useState("");
  return (
    <div className="w-full flex flex-col gap-3">
      {postsList.map((post) => (
        <div
          key={post.id}
          className="p-4 bg-white/5 relative ring ring-gray-50/10 rounded-2xl shadow space-y-4"
        >
          <PostOptions
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            postId={post.id}
          />
          <PostAuthor post={post} />
          <span className="w-full h-px rounded-full bg-white/3 block" />
          <PostContent post={post} />
          <PostActions />
        </div>
      ))}
    </div>
  );
}

export default Posts;
