function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-100">
      <div className="flex flex-col items-center gap-5 animate-[pulse_1.5s_linear_infinite]">
        <p className="text-2xl font-semibold">برجاء الإنتظار</p>
        <div className="border-2 size-6 border-t-transparent animate-[spin_0.8s_linear_infinite] rounded-full"/>
      </div>
    </div>
  );
}

export default Loading;
