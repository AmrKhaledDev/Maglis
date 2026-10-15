function Skeleton() {
  return (
    <div className="w-full grid grid-cols-2 gap-3">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex items-center gap-3 animate-pulse">
            <span className="size-20 rounded-sm bg-white/5 block" />
            <div className="flex flex-col gap-5">
              <span className="w-35 bg-white/5 h-2 block rounded-full" />
              <span className="w-20 bg-white/5 h-2 block rounded-full" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Skeleton;
