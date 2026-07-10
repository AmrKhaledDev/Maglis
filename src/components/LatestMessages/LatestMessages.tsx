import Image from "next/image";

function LatestMessages() {
  const users = [
    {
      id: "1",
      name: "محمد خالد",
      image:
        "https://i.pinimg.com/1200x/2c/e3/98/2ce398b6e5a2999258f2327bbbb72a73.jpg",
      content: "عامل اي ياعمرو انا محمد ",
    },
    {
      id: "2",
      name: "ياسر احمد",
      image:
        "https://i.pinimg.com/736x/25/33/8f/25338f488af2c45912c15ebab325e363.jpg",
      content: "السلام عليكم ورحمة الله وبركاته",
    },
    {
      id: "3",
      name: "طارق جلال",
      image:
        "https://i.pinimg.com/736x/ca/6a/2c/ca6a2cb55e22facf888ac362fc34160f.jpg",
      content: "عايز اعمل موقع يامورا",
    },
  ];
  return (
    <div className="h-fit w-60 p-5 bg-white/3 ring ring-gray-50/5 rounded-xl mt-5">
      <div className="space-y-3">
        <h2 className="font-semibold text-xl text-center">الأصدقاء</h2>
        <span className="w-full h-px rounded-full bg-white/3 block"/>
      </div>
      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-2">
            <Image
              src={user.image}
              alt="صورة المستخدم"
              width={60}
              height={60}
              className="size-10 rounded-full object-cover shrink-0"
            />
            <div>
              <h2>{user.name}</h2>
              <p className="text-xs text-gray-300">{user.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LatestMessages;
