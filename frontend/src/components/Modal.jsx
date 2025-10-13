// src/components/Modal.jsx
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModalContext } from '../utils/ModalContext';
import './Modal.css';

const Modal = () => {
  const { isModalOpen, closeModal, modalContent } = useModalContext();

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="modal-overlay"
          onClick={(e) => {
            // Close only if clicking outside modal content
            if (e.target === e.currentTarget) closeModal();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-container"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <button
              onClick={closeModal}
              className="modal-close-btn"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            {modalContent}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
