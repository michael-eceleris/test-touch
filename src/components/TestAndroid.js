import React from "react";
import { FullScreen } from "react-full-screen";
import Hammer from "react-hammerjs";

import Modal from "./Modal";

const TestAndroid = ({
  numbersBySquare,
  handle,
  options,
  showTest,
  heightSquare,
  handleTap,
  numberSquareInWidth,
}) => {
  return (
    <FullScreen handle={handle}>
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
    </FullScreen>
  );
};

export default TestAndroid;
