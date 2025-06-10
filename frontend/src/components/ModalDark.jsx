import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const Modal = ({ open, onClose, children, origin }) => {
  // Center of viewport
  const centerX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
  const centerY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

  // Calculate offset from modal center to origin
  const offset = origin
    ? {
        x: origin.x - centerX,
        y: origin.y - centerY,
      }
    : { x: 0, y: 0 };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-black/70 to-black/50"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="text-secondary bg-primary rounded-lg shadow-lg px-8 py-12 max-w-lg w-full relative border-secondary"
            style={{
              position: "fixed",
              zIndex: 60,
            }}
            initial={{
              x: offset.x,
              y: offset.y,
              scale: 0.1,
              opacity: 0.2,
            }}
            animate={{
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              transition: {
                type: "spring",
                bounce: 0.1,
                duration: 0.3,
              },
            }}
            exit={{
              x: offset.x,
              y: offset.y,
              scale: 0.1,
              opacity: 0.2,
              transition: { duration: 0.2 },
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="cursor-pointer absolute top-5 right-5"
              onClick={onClose}
              aria-label="Close"
            >
              <X />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;