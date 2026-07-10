"use client";
import CreatePostComposer from "./_components/CreatePostComposer/CreatePostComposer";
import Posts from "./_components/Posts/Posts";
import Stories from "./_components/Stories/Stories";
// =================================================
function Feeds() {
  return (
    <div className="flex flex-col max-w-180 mx-auto">
      <Stories />
      <div className="flex flex-col gap-5">
        <span className="w-full h-px bg-white/3 rounded-full" />
        <CreatePostComposer />
        <Posts />
      </div>
    </div>
  );
}

export default Feeds;
