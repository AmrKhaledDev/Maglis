
function Skeleton() {
  return (
    <>
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex items-center gap-4 animate-pulse">
            <span className="size-35 bg-white/5 block shadow rounded-xl" />
            <div className="flex flex-col gap-4">
              <span className="w-100 bg-white/5 block shadow h-2.5 rounded-full" />
              <span className="w-50 bg-white/5 block shadow h-2.5 rounded-full" />
              <span className="w-70 bg-white/5 block shadow h-2.5 rounded-full" />
              <span className="w-20 bg-white/5 block shadow h-2.5 rounded-full" />
            </div>
          </div>
        ))}
    </>
  );
}

export default Skeleton;
