import React from "react";
import { FcInfo } from "react-icons/all";
import { useModal } from "../provider/modalProvider";

const ModalStart = ({ onClose }) => {
  const { closeModalStart } = useModal();
  const handleClose = () => {
    closeModalStart();
    onClose();
  };
  return (
    <div
      className='fixed z-50 overflow-y-auto'
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div
        className={`flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 `}
      >
        <div
          className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
          aria-hidden='true'
        ></div>
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>
        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full `}
        >
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10 '>
                <FcInfo
                  size={"25px"}
                  style={{
                    color: "rgba(239, 68, 68, 1)",
                    borderColor: "rgba(239, 68, 68, 1)",
                    stroke: "rgba(239, 68, 68, 1)",
                  }}
                />
              </div>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3
                  className='text-lg leading-6 font-medium text-gray-900'
                  id='modal-title'
                >
                  Prueba de Pantalla
                </h3>
                <div className='mt-2'>
                  <p className='text-center my-1 font-semibold text-gray-500'>
                    A continuacion, se realizara una prueba de la pantalla con
                    el fin de continuar con el proceso de adquisicion de poliza.
                  </p>
                  <p className='text-sm text-gray-500'>
                    Esta prueba se basa en seleccionar lo cuadros generados para
                    validar el touch de la pantalla.
                  </p>
                  <a
                    href='https://files-statics-protegeme.s3.amazonaws.com/Politica+deprotecciondedatos-min.pdf'
                    className='underline underline-offset-4 text-blue-800 my-3 font-semibold '
                  >
                    Terminos y Condiciones
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              type='button'
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
              onClick={handleClose}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalStart;
