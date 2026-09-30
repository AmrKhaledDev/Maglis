function Skeleton() {
  return (
    <>
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="py-2 animate-pulse flex items-center gap-2.5 shadow rounded"
          >
            <span className="size-10 rounded-full block bg-white/5 shrink-0" />
            <div className="flex justify-between gap-2 w-full">
              <div className="flex flex-col gap-2">
                <span className="w-20 h-1.5 block bg-white/5 rounded-full shadow" />
                <span className="w-40 h-1.5 block bg-white/5 rounded-full shadow" />
              </div>
              <span className="w-10 h-1.5 block bg-white/5 rounded-full shadow" />
            </div>
          </div>
        ))}
    </>
  );
}

export default Skeleton;
