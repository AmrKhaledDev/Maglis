function FriendRequestsSkeleton() {
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
              <span className="size-13 bg-white/5 block rounded-full shrink-0" />
              <div className="flex flex-col gap-2">
                <span className="w-20 h-2 bg-white/5 block rounded-full" />
                <span className="w-40 h-2 bg-white/5 block rounded-full" />
              </div>
            </div>
            <div className="flex  gap-2">
              <span className="w-20 h-4 block bg-white/5 rounded-full" />
              <span className="w-20 h-4 block bg-white/5 rounded-full" />
            </div>
          </div>
        ))}
    </>
  );
}

export default FriendRequestsSkeleton;
