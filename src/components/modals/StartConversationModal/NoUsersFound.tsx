import Image from "next/image";
// ============================
function NoUsersFound() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative size-40 mr-7">
        <Image
          src="/no_users_found_image.png"
          alt="not users found"
          className="object-contain"
          fill
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl">لم نجد أي نتائج</h2>
        <p className="text-sm text-gray-300">
          تأكد من كتابة الاسم بشكل صحيح أو جرب البحث عن كلمة أخرى.
        </p>
      </div>
    </div>
  );
}

export default NoUsersFound;
