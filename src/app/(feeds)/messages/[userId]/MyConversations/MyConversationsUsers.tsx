import Image from "next/image";
// ==================================
function MyConversationsUsers() {
  return (
    <div className="flex flex-col gap-1.5 max-h-full overflow-y-auto pl-2">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-2 py-2 px-4 bg-white/5 relative hover:bg-white/10 mytransition cursor-pointer rounded-l-2xl"
          >
            <div className="relative size-10 rounded-full overflow-hidden shrink-0">
              <Image
                src="/user.jpg"
                alt="صورة المستخدم"
                className="object-cover"
                fill
              />
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between">
                <h2 className="font-medium text-gray-200">أحمد فاروق</h2>
                <p className="text-xs text-gray-400">10:30ص</p>
              </div>
              <p className="font-medium text-gray-400 text-sm line-clamp-1">
                عامل اي؟
              </p>
            </div>
            <span className="absolute right-0 h-full block w-1 bg-sky-900 shadow-sky-900 shadow" />
          </div>
        ))}
    </div>
  );
}

export default MyConversationsUsers;
