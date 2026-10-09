function UserFriends({ userId }: { userId: string }) {
  return (
    <div className="flex-1 bg-white/2 h-100 rounded-2xl p-5">
      <div className="flex flex-col gap-7">
        <h1 className="text-xl font-semibold text-gray-200">الأصدقاء</h1>
        <div className="flex items-center gap-15 justify-center border-b-4 border-b-white/1 mx-10">
          <button className="px-4 font-medium text-[17px] pb-2 h-full relative">الأصدقاء
            <span className="absolute w-full h-0.75 bg-white -bottom-0.75 right-0 rounded-full"/>
          </button>
          <button className="px-4 font-medium text-[17px] pb-2 text-[#797979]">المتابعين</button>
          <button className="px-4 font-medium text-[17px] pb-2 text-[#797979]">المتابعات</button>
        </div>
      </div>
    </div>
  );
}

export default UserFriends;
