import { motion, AnimatePresence } from "framer-motion";
import { type ReactNode, useEffect } from "react";

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  variant?: "settings" | "edit" | "confirm";
  children: ReactNode;
}

export default function BaseModal({
  open,
  onClose,
  title,
  variant = "settings",
  children,
}: BaseModalProps) {
  const overlayClass = `${variant}-overlay`;
  const modalClass = `${variant}-modal`;

  // ESC key closes modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={overlayClass}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // prevent overlay click from conflicting with modal clicks
        onMouseDown={(e) => {
          // only close if the user clicked directly on overlay, not on children
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          className={modalClass}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {title && <h3>{title}</h3>}
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
