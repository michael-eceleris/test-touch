import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Hammer from "react-hammerjs";

import Modal from "./Modal";

const Test = () => {
  const handle = useFullScreenHandle();
  const [widthDevice, setWidthDevice] = useState(0);
  const [heightDevice, setHeightDevide] = useState(0);
  const [heightSquare, setHeightSquare] = useState(0);
  const [numbersBySquare, setNumbersBySquare] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const numberSquareInWidth = 6;
  const numberSquareInHeigth = 8;
  let selectSquares = [];
  useEffect(() => {
    setHeightDevide(window.screen.availHeight);
    setWidthDevice(window.screen.availWidth);
    measureSquare();
    setNumbersArray();
    //eslint-disable-next-line
  }, [widthDevice, heightDevice]);

  const measureSquare = () => {
    setHeightSquare(heightDevice / numberSquareInHeigth);
  };

  const setNumbersArray = () => {
    let data = [];
    for (let i = 1; i <= numberSquareInHeigth * numberSquareInWidth; i++) {
      data.push(i);
    }
    if (data.length > 0) {
      setNumbersBySquare(data);
    }
  };

  const options = {
    touchAction: "compute",
    recognizers: {
      tap: {
        time: 600,
        threshold: 100,
      },
    },
  };
  const handleTap = (e) => {
    let i = 0;
    let x = e.changedPointers[0].pageX;
    let y = e.changedPointers[0].pageY;
    let percentageX = Math.floor(x / (widthDevice / numberSquareInWidth));
    let percentageY = Math.floor(y / (heightDevice / numberSquareInHeigth));
    i = percentageX + numberSquareInWidth * percentageY;
    document.getElementById(`square_${numbersBySquare[i]}`).style.background =
      "red";
    selectSquares.push(numbersBySquare[i]);
    let result = selectSquares.filter((item, index) => {
      return selectSquares.indexOf(item) === index;
    });
    result.sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    });
    if (JSON.stringify(numbersBySquare) === JSON.stringify(result)) {
      setShowModal(true);
    }
  };

  const handleScreenFull = () => {
    handle.enter();
    setShowTest((ev) => !ev);
  };

  return (
    <div className='flex justify-center items-center flex-col'>
      <p className='text-center my-5'>
        Realiza la prueba del touch, para saber la condicion de la pantalla del
        dispositivo
      </p>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={handleScreenFull}
      >
        Realizar prueba de touch
      </button>
      <FullScreen handle={handle}>
        {showModal && <Modal setShowModal={setShowModal} handle={handle} />}
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
    </div>
  );
};
export default Test;
