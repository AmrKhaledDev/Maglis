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
      <Swiper slidesPerView={"auto"} spaceBetween={6} className="w-full h-30 ">
        <SwiperSlide className="flex! buttonShowModal flex-col items-center gap-2 h-full! w-20! justify-center">
          <button
            onClick={() => setModal(true)}
            className="relative cursor-pointer"
          >
            <Image
              src={"/my_photo.jpeg"}
              alt="صورتك"
              width={100}
              height={100}
              className="rounded-full shrink-0 size-16 object-cover"
            />
            <Plus className="absolute bottom-0 left-0 text-white bg-slate-800 rounded-full p-1 size-5" />
          </button>
          <p className=" text-gray-300 text-xs">قصتك</p>
        </SwiperSlide>
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <SwiperSlide className="flex! flex-col items-center gap-2 h-full! w-25! justify-center shrink-0">
              <div className="p-px  size-17 shrink-0 rounded-full bg-linear-to-r from-[#c5ab77] to-purple-600 hover:scale-103 mytransition">
                <div className="relative size-full rounded-full ">
                  <Image
                    src="/my_photo.jpeg"
                    alt="user image"
                    fill
                    priority
                    className="object-cover rounded-full cursor-pointer"
                  />
                </div>
              </div>
              <p
                dir="auto"
                className="text-xs text-slate-300 font-semibold line-clamp-1 [word-break:break-word]"
              >
                Amr Khaled
              </p>
            </SwiperSlide>
          ))}
      </Swiper>
      <StoryModal modal={modal} setModal={setModal} />
    </div>
  );
}

export default Stories;
