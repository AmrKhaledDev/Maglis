function PostsSkeleton() {
  return (
    <div className="flex flex-col gap-3 h-full">
      {Array(2)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="w-full h-fit flex flex-col gap-4 bg-white/5 p-3 animate-pulse rounded-lg"
          >
            <div className="flex items-center gap-2">
              <span className="bg-white/5 rounded-full shrink-0 size-11 block" />
              <div className="flex flex-col gap-2">
                <span className="w-25 h-1.5 rounded-full block bg-white/5" />
                <span className="w-15 h-1 rounded-full block bg-white/5" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="w-80 h-1.5 rounded-full bg-white/5 block" />
                <span className="w-50 h-1.5 rounded-full bg-white/5 block" />
              </div>
              <span className="h-60 w-full bg-white/5 block rounded-lg" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default PostsSkeleton;
