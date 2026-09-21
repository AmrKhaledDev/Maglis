function PostsSkeleton() {
  return (
    <div className="flex flex-col h-full">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="w-full h-fit flex flex-col gap-3 p-2 animate-pulse rounded-lg"
          >
            <div className="flex items-center gap-2">
              <span className="bg-white/5 shadow rounded-full shrink-0 size-14 block" />
              <div className="flex flex-col gap-2">
                <span className="w-30 h-2 block bg-white/5 shadow rounded-full" />
                <span className="w-15 h-2 block bg-white/5 shadow rounded-full" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <span className="w-77 h-2.5 bg-white/5 shadow block rounded-full" />
                <span className="w-100 h-2.5 bg-white/5 shadow block rounded-full" />
              </div>
              <span className="h-75 w-full bg-white/5 shadow block rounded-lg" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default PostsSkeleton;
