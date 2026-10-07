function Skeleton() {
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between animate-pulse"
          >
            <div className="flex items-center gap-2">
              <span className="size-11 rounded-full bg-white/5 block" />
              <div className="flex flex-col gap-2">
                <span className="w-15 h-2 rounded-full bg-white/5 block" />
                <span className="w-30 h-2 rounded-full bg-white/5 block" />
              </div>
            </div>
            <span className="w-13 h-2 bg-white/5 block rounded-full" />
          </div>
        ))}
    </>
  );
}

export default Skeleton;
