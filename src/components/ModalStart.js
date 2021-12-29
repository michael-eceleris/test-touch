import React from "react";
import { useModal } from "../provider/modalProvider";
import EcelerisIcon from "../assets/img/eceleris.png";

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
              <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 rounded-full sm:mx-0 sm:h-10 sm:w-full '>
                <img
                  src={EcelerisIcon}
                  height={"45px"}
                  width={"45px"}
                  alt='eceleris_icon'
                />
                <p
                  className='text-lg text-gray-900 ml-2 font-semibold'
                  id='modal-title'
                >
                  Prueba de touch
                </p>
              </div>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <div className='mt-8'>
                  <p className='text-center my-4 font-semibold text-gray-500'>
                    A continuacion, se realizara una prueba de la pantalla con
                    el fin de continuar con el proceso de adquirir una poliza.
                  </p>
                  <p className='text-sm text-gray-500 py-3'>
                    Esta prueba se basa en seleccionar lo cuadros generados para
                    validar el touch de la pantalla.
                  </p>
                  <a
                    href='https://files-statics-protegeme.s3.amazonaws.com/Politica+deprotecciondedatos-min.pdf'
                    className='underline text-sm underline-offset-4 text-blue-800 mt-10 font-semibold '
                  >
                    Terminos y Condiciones
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-3 pb-5 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              type='button'
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
              onClick={handleClose}
            >
              Empezar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalStart;
