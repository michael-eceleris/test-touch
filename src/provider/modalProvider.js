import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalStart, setShowModalStart] = useState(true);
  const [showModalTestOk, setShowModalTestOk] = useState(false);
  const [showModalIncompatible, setShowModalIncompatible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModalStart = () => {
    setShowModalStart(false);
  };

  const openModalStart = () => {
    setShowModalStart(true);
  };

  const closeModalTestOk = () => {
    setShowModalTestOk(false);
  };

  const openModalTestOk = () => {
    setShowModalTestOk(true);
  };

  const closeModalIncompatible = () => {
    setShowModalIncompatible(false);
  };

  const openModalIncompatible = () => {
    setShowModalIncompatible(true);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        closeModal,
        openModal,
        showModalStart,
        closeModalStart,
        openModalStart,
        showModalTestOk,
        closeModalTestOk,
        openModalTestOk,
        showModalIncompatible,
        openModalIncompatible,
        closeModalIncompatible,
        isLoading,
        setIsLoading,
        isSuccess,
        setIsSuccess,
        isError,
        setIsError,
      }}
      children={children}
    />
  );
};

export const useModal = () => {
  const squares = useContext(ModalContext);
  return squares;
};
