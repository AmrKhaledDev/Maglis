import { useActiveModal } from "@/providers/ActiveModalProvider";
import { PostType } from "@/types/Post.type";
import Linkify from "linkify-react";
import { X } from "lucide-react";
import Image from "next/image";
import { createPortal } from "react-dom";
// ==========================================================
function ContentTextModal({ post }: { post: PostType }) {
  const { setActiveModal } = useActiveModal();
  return createPortal(
    <div className="fixed flex items-center justify-center inset-0 bg-black/40  z-100">
      <div className="bg-zinc-950 ring ring-gray-50/5 backdrop-blur-3xl w-200 p-3 rounded-xl shadow-2xl flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] text-gray-300">المحتوى النصي</h2>
            <button
              onClick={() => setActiveModal(null)}
              className="text-gray-300 cursor-pointer hover:text-white"
            >
              <X className="size-5" />
            </button>
          </div>
          <hr className="border-white/2" />
        </div>
        <div className="flex gap-3">
          <div className="size-10 relative shrink-0">
            <Image
              src={post.author.image || "/user.jpg"}
              alt={post.author.name}
              className="rounded-full"
              fill
            />
          </div>
          <span className="h-10 w-px block bg-white/4 shrink-0" />
          <Linkify
            options={{
              target: "_blank",
              rel: "noopener noreferrer",
              attributes: {
                className: "text-sky-500 hover:underline ",
              },
            }}
          >
            <p
              dir="auto"
              className="whitespace-pre-line text-[18px] leading-8 [word-break:break-word] max-h-100 overflow-y-auto"
            >
              {post.content}
            </p>
          </Linkify>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ContentTextModal;
