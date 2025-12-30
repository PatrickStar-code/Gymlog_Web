import { motion } from "framer-motion";

export default function StepItem({
  active,
  label,
  icon,
}: {
  active: boolean;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={false}
      animate={{
        scale: active ? 1 : 0.9,
        opacity: active ? 1 : 0.5,
      }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center text-center z-10"
    >
      <motion.div
        animate={{
          backgroundColor: active ? "#22c55e" : "#ffffff",
          borderColor: active ? "#22c55e" : "#d1d5db",
          color: active ? "#ffffff" : "#6b7280",
        }}
        transition={{ duration: 0.3 }}
        className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
      >
        {icon}
      </motion.div>

      <span className="mt-2 text-xs sm:text-sm md:text-base text-gray-700 dark:text-white">
        {label}
      </span>
    </motion.div>
  );
}
