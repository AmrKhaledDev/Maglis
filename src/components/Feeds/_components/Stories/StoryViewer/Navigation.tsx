import { Story } from "@prisma/client";
import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// ====================================================================
function Navigation({
  setIndex,
  stories,
}: {
  setIndex: Dispatch<SetStateAction<number>>;
  stories: Story[];
}) {
  const buttons = [
    {
      icon: IoIosArrowForward,
      position: "right-50",
      handle: () =>
        setIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1)),
    },
    {
      icon: IoIosArrowBack,
      position: "left-50",
      handle: () => setIndex((prev) => (prev == 0 ? 0 : prev - 1)),
    },
  ];
  return (
    <>
      {buttons.map((button) => (
        <button
          key={button.position}
          onClick={button.handle}
          className={clsx(
            "absolute z-40 top-1/2 text-2xl shadow cursor-pointer bg-white/5 backdrop-blur rounded-full p-2 hover:bg-white/10",
            button.position,
          )}
        >
          <button.icon />
        </button>
      ))}
    </>
  );
}

export default Navigation;
