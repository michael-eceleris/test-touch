import React from "react";
import Hammer from "react-hammerjs";
import { Fragment } from "react";

import Modal from "./Modal";

const TestIphone = ({
  numbersBySquare,
  handle,
  options,
  setShowModal,
  showModal,
  showTest,
  heightSquare,
  handleTap,
  numberSquareInWidth,
}) => {
  return (
    <Fragment>
      <div
        className={` ${
          showTest ? " fixed z-10 bg-white" : ""
        }  w-screen h-screen top-0 right-0 `}
      >
        <Modal />
        <div className={`flex flex-wrap ${showTest ? "" : "hidden"} `}>
          {numbersBySquare &&
            numbersBySquare.map((d) => (
              <Hammer options={options} onPan={handleTap} onTap={handleTap}>
                <div
                  key={`square_${d}`}
                  id={`square_${d}`}
                  data-index={d}
                  className='mx-auto bg-blue-500  border-indigo-50'
                  style={{
                    width: `calc( ${100 / numberSquareInWidth}% - 1px)`,
                    borderWidth: "0.5px",
                    height: heightSquare,
                  }}
                ></div>
              </Hammer>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default TestIphone;
