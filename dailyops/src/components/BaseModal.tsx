import { AnimatePresence, motion, type Variants } from "framer-motion";
import { type ReactNode, useEffect, useId } from "react";
import { createPortal } from "react-dom";

type ModalVariant = "settings" | "edit" | "confirm";

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  variant?: ModalVariant;
  children: ReactNode;
}

const overlayVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const surfaceVariants: Variants = {
  initial: { opacity: 0, marginTop: 32 },
  animate: { opacity: 1, marginTop: 0 },
  exit: { opacity: 0, marginTop: 24 },
};

export default function BaseModal({
  open,
  onClose,
  title,
  variant = "settings",
  children,
}: BaseModalProps) {
  const titleId = useId();

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        className={`modal-overlay ${variant}-overlay`}
        variants={overlayVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <motion.section
          className={`modal-surface ${variant}-modal`}
          variants={surfaceVariants}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
        >
          {title && (
            <header className="modal-header">
              <h3 id={titleId}>{title}</h3>
            </header>
          )}
          <div className="modal-content">{children}</div>
        </motion.section>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
