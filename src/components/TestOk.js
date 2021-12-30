import React from "react";
import Hammer from "react-hammerjs";
import { Fragment } from "react";

const TestOk = ({
  numbersBySquare,
  options,
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
                  className='mx-auto bg-green-500  border-indigo-50'
                  style={{
                    width: `calc(${numberSquareInWidth}px - 1px)`,
                    borderWidth: "0.5px",
                    height: `${heightSquare}px`,
                  }}
                ></div>
              </Hammer>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default TestOk;
