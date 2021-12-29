import React from "react";
import Hammer from "react-hammerjs";
import { Fragment } from "react";
import Countdown from "react-countdown";
import { When } from "react-if";

import CircularCountDown from "./CircularProgress";
import ModalExpireTime from "./ModalTimeExpire";

const TestAndroidBack = ({
  numbersBySquare,
  options,
  showTest,
  heightSquare,
  handleTap,
  numberSquareInWidth,
  paramTimeStap,
  setModalExpire,
  modalExpire,
  totalTime,
  setTotalTime,
}) => {
  return (
    <Fragment>
      <div
        className={` ${
          showTest ? " fixed z-10 bg-white" : ""
        }  w-screen h-screen top-0 right-0 `}
      >
        <div className={`flex flex-wrap ${showTest ? "" : "hidden"} `}>
          <When condition={modalExpire}>
            <ModalExpireTime />
          </When>
          <Countdown
            date={paramTimeStap}
            intervalDelay={0}
            precision={3}
            renderer={(props) => {
              if (totalTime === null) {
                setTotalTime(props.total);
              }
              setModalExpire(props.completed);
              return (
                <CircularCountDown
                  completed={props.completed}
                  total={props.total}
                  minutes={props.minutes}
                  seconds={props.seconds}
                  totalTime={totalTime}
                />
              );
            }}
          />
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
      </div>
    </Fragment>
  );
};

export default TestAndroidBack;
