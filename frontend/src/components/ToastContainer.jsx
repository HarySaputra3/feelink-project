import { AnimatePresence } from "motion/react";
import { useToast } from "../contexts/ToastContext";
import Toast from "./Toast";

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-5 right-0 w-auto md:w-fit z-50 flex flex-col items-end max-w-full">
      <div className="flex flex-col gap-2 px-4 w-auto md:w-auto">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              type={toast.type}
              message={toast.message}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ToastContainer;
