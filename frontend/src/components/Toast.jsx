import { useEffect } from "react";
import { motion } from "motion/react";
import { CircleAlert, CircleCheck } from "lucide-react";

const Toast = ({ type = "success", message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const Icon = type === "success" ? CircleCheck : CircleAlert;
  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
  }[type] || "bg-gray-500";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`
        w-full md:w-fit
        flex items-center justify-center gap-2
        rounded-md px-6 py-4 font-semibold text-white shadow-lg
        ${bgColor}
      `}
      role="alert"
    >
      <Icon className="inline-block" size={24} />
      <span>{message}</span>
    </motion.div>
  );
};

export default Toast;
