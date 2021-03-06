import React from "react";
import { IoMdAlert } from "react-icons/all";

const ModalIncompatible = () => {
  return (
    <div
      className='fixed z-50 overflow-y-auto w-screen'
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
              <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 '>
                <IoMdAlert
                  size={"22px"}
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
                  Dispositivo Incompatible
                </h3>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    Lo sentimos, este dispositivo es incompatible con esta
                    prueba
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalIncompatible;
