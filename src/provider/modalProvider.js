import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };
  return (
    <ModalContext.Provider
      value={{
        showModal,
        closeModal,
        openModal,
      }}
      children={children}
    />
  );
};

export const useModal = () => {
  const squares = useContext(ModalContext);
  return squares;
};
