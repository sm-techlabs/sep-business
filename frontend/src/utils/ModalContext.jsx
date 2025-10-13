import { createContext, useContext, useEffect, useState } from 'react';

// Create context
const ModalContext = createContext(null);

// Provider component
export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModalWithContent = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  }
  
  return (
    <ModalContext.Provider value={{ isModalOpen, modalContent, openModalWithContent, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook for convenient access
export const useModalContext = () => useContext(ModalContext);
