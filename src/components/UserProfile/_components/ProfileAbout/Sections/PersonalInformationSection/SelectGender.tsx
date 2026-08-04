import { genderOptions } from "@/data/Profile/genderOptions";
import clsx from "clsx";
import { motion } from "framer-motion";
import { UseFormSetValue } from "react-hook-form";
import { FormHookValues } from "../../../../_types/FormHookValues.type";
import { Gender } from "@prisma/client";
// ========================================================================
function SelectGender({
  gender,
  setValue,
}: {
  setValue: UseFormSetValue<FormHookValues>;
  gender: "" | Gender | undefined;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mt-1.5 text-sm selectGender ring ring-gray-50/15 text-gray-100 w-full p-1 rounded-lg gap-2 font-semibold shadow-2xl bg-slate-700 flex flex-col"
    >
      {genderOptions.map(({ value, icon: Icon, iconColor, label, id }) => (
        <button
          type="button"
          disabled={gender == value}
          onClick={() => {
            setValue("gender", value);
          }}
          key={id}
          className="flex disabled:bg-slate-900 items-center gap-3 w-full justify-between p-1 rounded-sm mytransition not-disabled:cursor-pointer hover:bg-slate-900"
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
