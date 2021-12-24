import React from "react";
import { When } from "react-if";
import { useParams } from "react-router-dom";

import { useModal } from "../provider/modalProvider";
import { usePostSendCode } from "../services/sendCode/useSendCode";

const Modal = () => {
  const { showModal, closeModal, openModalTestOk } = useModal();
  const { idTouch } = useParams();
  const { mutateAsync: postCode, isLoading } = usePostSendCode();
  const sendCode = () => {
    postCode({
      test: true,
      token: idTouch,
    }).then((res) => {
      console.log("res", res);
    });
    closeModal();
    openModalTestOk();
  };
  return (
    <When condition={showModal}>
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
                <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10'>
                  <svg
                    className='h-6 w-6 text-green-600'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 20 20'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    />
                  </svg>
                </div>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <h3
                    className='text-lg leading-6 font-medium text-gray-900'
                    id='modal-title'
                  >
                    Prueba de test aprobada
                  </h3>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      Tu pantalla paso la prueba, por lo cual es posible
                      asegurar el dispositivo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
              <button
                type='button'
                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'
                onClick={sendCode}
                disabled={isLoading}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </When>
  );
};

export default Modal;
