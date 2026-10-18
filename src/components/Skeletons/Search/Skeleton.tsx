function Skeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-5 bg-white/5 rounded-2xl animate-pulse"
          >
            <div className="flex items-center gap-3">
              <span className="size-15 bg-white/5 rounded-full block" />
              <div className="flex flex-col gap-4">
                <span className="w-30 h-2 rounded-full block bg-white/5" />
                <span className="w-50 h-2 rounded-full block bg-white/5" />
              </div>
            </div>
            <span className="w-20 h-2 bg-white/5 block rounded-full" />
          </div>
        ))}
    </div>
  );
}

export default Skeleton;
