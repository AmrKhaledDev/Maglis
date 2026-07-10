"use client";
import { Plus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { useState } from "react";
import StoryModal from "./_components/StoryModal";
// =============================================================
function Stories() {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <Swiper
        onClick={() => setModal(true)}
        slidesPerView={"auto"}
        className="w-full h-30 "
      >
        <SwiperSlide className="flex! buttonShowModal flex-col items-center gap-2 h-full! w-25! justify-center">
          <span className="size-15 flex items-center cursor-pointer justify-center hover:scale-105 active:scale-95 mytransition ring ring-gray-50/50 bg-[#c5ab77] rounded-full shadow-[0_0_10px_#c5ab77]">
            <Plus className="size-6 " />
          </span>
          <p className="font-bold text-gray-300 text-sm">قصتك</p>
        </SwiperSlide>
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <SwiperSlide className="flex! flex-col items-center gap-2 h-full! w-25! justify-center">
              <div className="relative size-15 rounded-full hover:scale-105 mytransition">
                <Image
                  src="/my_photo.jpeg"
                  alt="user image"
                  fill
                  priority
                  className="object-cover rounded-full cursor-pointer border-2 border-pink-700 hover:border-pink-500 mytransition"
                />
              </div>
              <p className="text-xs text-slate-300 font-semibold line-clamp-1 [word-break:break-word]">
                عمرو غفر الله له
              </p>
            </SwiperSlide>
          ))}
      </Swiper>
      <StoryModal modal={modal} setModal={setModal} />
    </div>
  );
}

export default Stories;
