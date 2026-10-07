function Skeleton() {
  return (
    <div className="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-4 sm:gap-2 gap-1">
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="sm:p-3 p-2  rounded bg-white/3 animate-pulse flex flex-col items-center justify-center gap-2"
          >
            <span className="bg-white/5 block rounded-full size-13" />
            <span className="bg-white/5 block w-25 h-1 rounded-full" />
            <span className="bg-white/5 block w-50 h-1 rounded-full" />
            <span className="bg-white/5 block w-15 h-1 rounded-full" />
            <span className="bg-white/5 block w-full h-1 rounded-full" />
            <span className="bg-white/5 block w-full h-1 rounded-full" />
         
          </div>
        ))}
    </div>
  );
}

export default Skeleton;
