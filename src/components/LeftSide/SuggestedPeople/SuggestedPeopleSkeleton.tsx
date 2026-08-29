function SuggestedPeopleSkeleton() {
  return (
    <>
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between animate-pulse"
          >
            <div className="flex items-center gap-2">
              <span className="size-12 rounded-full block bg-white/5" />
              <div className="flex flex-col gap-2">
                <span className="w-20 rounded-full h-2 bg-white/5 block" />
                <span className="w-13 h-2 rounded-full bg-white/5 block" />
              </div>
            </div>
            <span className="w-10 h-2 rounded-full block bg-white/5" />
          </div>
        ))}
    </>
  );
}

export default SuggestedPeopleSkeleton;
