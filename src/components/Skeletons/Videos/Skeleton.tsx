function Skeleton() {
  return (
    <div className="flex flex-col gap-6">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex items-center animate-pulse gap-15">
            <div className="flex flex-col gap-3 items-center">
              <span className="size-12 rounded-full bg-white/5 block shadow" />
              <span className="size-12 rounded-full bg-white/5 block shadow" />
              <span className="size-12 rounded-full bg-white/5 block shadow" />
            </div>
            <div className="flex-1 mx-auto flex flex-col gap-3 bg-white/1 p-4 rounded-2xl shadow">
              <span className="h-130 w-full block bg-white/5 rounded-lg shadow" />
              <span className="w-100 h-2.5 rounded-full bg-white/5 block shadow" />
              <span className="w-80 h-2.5 rounded-full bg-white/5 block shadow" />
              <div className="flex items-center gap-3 mt-1">
                <span className="size-14 rounded-full bg-white/5 block shrink-0 shadow" />
                <div className="flex flex-col gap-3 w-full">
                  <span className="w-35 h-1.5 bg-white/5 rounded-full block shadow" />
                  <span className="w-20 h-1.5 bg-white/5 rounded-full block shadow" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Skeleton;
