import { genderOptions } from "@/data/Profile/genderOptions";
import { Gender } from "@prisma/client";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
// ========================================================================
function SelectGender({ gender }: { gender: "" | Gender | undefined }) {
  const { setValue } = useFormContext();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mt-1.5 text-sm selectGender ring ring-white/4 text-gray-100 w-full p-1 rounded-lg gap-2 font-semibold shadow-2xl  flex flex-col"
    >
      {genderOptions.map(({ value, icon: Icon, iconColor, label, id }) => (
        <button
          type="button"
          disabled={gender == value}
          onClick={() => {
            setValue("gender", value);
          }}
          key={id}
          className="flex items-center gap-3 w-full justify-between p-2 rounded-sm mytransition not-disabled:cursor-pointer not-disabled:hover:bg-[#181B22] not-disabled:active:bg-[#181B22]"
        >
          <span className="flex items-center gap-3">
            <Icon className={clsx("p-1 size-6 shadow rounded-sm", iconColor)} />
            {label}
          </span>
          {gender === value && (
            <span className="size-2 rounded-full block bg-sky-500 ring ring-white/20 ml-1 animate-pulse shadow" />
          )}
        </button>
      ))}
    </motion.div>
  );
}

export default SelectGender;
