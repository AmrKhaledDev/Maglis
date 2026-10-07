import StartConversationModal from "@/components/modals/StartConversationModal/StartConversationModal";
import { useActiveModal } from "@/providers/ActiveModalProvider";
import {
    CornerDownLeft,
    CornerDownRight,
    MessageCircleDashed
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// =====================================
function EmptyConversations() {
  const { activeModal, setActiveModal } = useActiveModal();
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="relative size-85">
          <Image
            src="/no_data_image.png"
            alt="no data image"
            fill
            priority
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-3xl">تبدو الصفحة فارغة</h2>
            <p className="text-gray-200">
              لا توجد محادثات بعد لماذا لا تبدأ واحدة جديدة؟
            </p>
          </div>
          <button
            onClick={() => setActiveModal("new_conversation")}
            className="py-1.5 px-6 font-medium hover:bg-gray-200 bg-gray-100 text-black/80 rounded-full flex items-center gap-2 text-sm shadow cursor-pointer"
          >
            <MessageCircleDashed strokeWidth={2} className="size-4" />
            بدء محادثة جديدة
          </button>
          <Link href={""} className="text-sm flex items-center gap-2 group ">
            <CornerDownLeft
              strokeWidth={0.5}
              className="mb-1 group-hover:-translate-x-0.5 mytransition"
            />
            <span className="text-gray-300"> تصفح أصدقائك</span>
            <CornerDownRight
              strokeWidth={0.5}
              className="mb-1 group-hover:translate-x-0.5 mytransition"
            />
          </Link>
          <Link href={"/"} className="text-sm">
            الرجوع للصفحة الرئيسية
          </Link>
        </div>
      </div>
      {activeModal === "new_conversation" && <StartConversationModal />}
    </>
  );
}

export default EmptyConversations;
