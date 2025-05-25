import { useEffect } from "react";
import { motion } from "motion/react";

const Toast = ({ type = "success", message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`
        top-5 right-5 z-50 min-w-[250px] max-w-[80vw] 
        rounded-md px-6 py-3 font-semibold text-white shadow-lg
        ${type === "success" ? "bg-green-500" : "bg-red-500"}
      `}
      role="alert"
    >
      {message}
    </motion.div>
  );
};

export default Toast;
