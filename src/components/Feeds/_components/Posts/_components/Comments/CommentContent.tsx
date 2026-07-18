import { Comment } from "@prisma/client";
import Image from "next/image";
// ==================================
function CommentContent({ comment }: { comment: Comment }) {
  return (
    <div className="flex flex-col gap-3">
      <p dir="auto" className="text-[12px]">
        {comment.content}
      </p>
      {comment.image && (
        <button className="relative w-full h-70 rounded-xl overflow-hidden group cursor-pointer">
          <Image
            src={comment.image}
            alt="صورة"
            fill
            className="z-10 object-cover"
          />
          <span className="absolute z-15 bg-black/30 inset-0 group-hover:bg-black/15 mytransition" />
        </button>
      )}
    </div>
  );
}

export default CommentContent;
