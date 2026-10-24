
function Skeleton() {
  return (
    <>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex items-center gap-2 animate-pulse">
            <span className="size-14 rounded-full bg-white/5 block shadow" />
            <div className="flex flex-col gap-3">
              <span className="w-35 h-2 bg-white/5 rounded-full block shadow" />
              <span className="w-15 h-2 bg-white/5 rounded-full block shadow" />
            </div>
          </div>
        ))}
    </>
  );
}

export default Skeleton;
