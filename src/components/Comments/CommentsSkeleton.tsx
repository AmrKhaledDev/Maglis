function CommentsSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="bg-white/10 animate-pulse h-fit flex flex-col gap-4 rounded-xl p-3 overflow-hidden"
          >
            <div className="flex items-center gap-2">
              <span className="shrink-0 size-8 rounded-full block bg-white/10" />
              <div className="flex flex-col gap-2">
                <span className="w-45 h-1.5 bg-white/10 block rounded-full" />
                <span className="w-20 h-1 bg-white/10 block rounded-full" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="h-2 w-50 bg-white/15 block rounded-full" />
              <span className="h-2 w-80 bg-white/15 block rounded-full" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default CommentsSkeleton;
