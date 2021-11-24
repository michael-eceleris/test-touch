import React from "react";
const Navbar = () => {
  return (
    <nav className='bg-gray-100'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex justify-center'>
          <div className='flex space-x-4 '>
            <p className='flex items-center py-5 px-2 text-gray-700 hover:text-gray-900'>
              <span className='font-bold'>Test touch screen</span>
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
