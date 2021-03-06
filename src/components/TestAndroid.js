import React from "react";
import { FullScreen } from "react-full-screen";
import Hammer from "react-hammerjs";

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
      <div className={`flex flex-wrap ${showTest ? "" : "hidden"} `}>
        {numbersBySquare &&
          numbersBySquare.map((d, index) => (
            <Hammer
              options={options}
              key={`hammer_index_${index}`}
              onPan={handleTap}
              onTap={handleTap}
            >
              <div
                key={`square_${d}`}
                id={`square_${d}`}
                data-index={d}
                className='mx-auto bg-gray-400  border-indigo-50'
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
