import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useFullScreenHandle } from "react-full-screen";
import { useParams } from "react-router-dom";
import Countdown from "react-countdown";

import { useMobile } from "../hooks/useMobile";
import TestIphone from "./TestIphone";
import TestAndroid from "./TestAndroid";
import { useSquares } from "../provider/squareProvider";
import { useModal } from "../provider/modalProvider";
import ModalExpireTime from "./ModalTimeExpire";

const Test = () => {
  const handle = useFullScreenHandle();
  const [widthDevice, setWidthDevice] = useState(0);
  const [heightDevice, setHeightDevide] = useState(0);
  const [heightSquare, setHeightSquare] = useState(0);
  const [numbersBySquare, setNumbersBySquare] = useState(null);
  const [showTest, setShowTest] = useState(false);
  const { isIphone } = useMobile();
  const {
    /* squareHeight: numberSquareInHeigth,
    squareWidth: numberSquareInWidth, */
    setSquareHeight,
    setSquareWidth,
  } = useSquares();
  const { openModal } = useModal();
  const { timestap } = useParams();
  let selectSquares = [];
  const numberSquareInHeigth = 6;
  const numberSquareInWidth = 4;
  useEffect(() => {
    if (isIphone) {
      setHeightDevide(
        window.screen.availHeight - window.screen.availHeight * 0.1727
      );
      setSquareHeight(
        Math.trunc(
          (window.screen.availHeight - window.screen.availHeight * 0.1727) / 40
        )
      );
    } else {
      setSquareHeight(Math.trunc(window.screen.availHeight / 40));
      setHeightDevide(window.screen.availHeight);
    }
    setWidthDevice(window.screen.availWidth);
    setSquareWidth(Math.trunc(window.screen.availWidth / 40));
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
      pinch: { enable: true },
    },
  };
  const handleTap = (e) => {
    e.preventDefault();
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
      openModal();
    }
  };

  const handleScreenFull = () => {
    handle.enter();
    setShowTest((ev) => !ev);
  };

  return (
    <div className='flex justify-center items-center flex-col'>
      <div className='h-screen w-full justify-center flex items-center flex-col pb-20'>
        <p className='text-center my-1 font-semibold'>
          A continuacion, se realizara una prueba de la pantalla con el fin de
          continuar con el proceso de adquisicion de poliza.
        </p>
        <p className='text-center my-1 font-semibold'>
          Esta prueba se basa en seleccionar lo cuadros generados para validar
          el touch de la pantalla.
        </p>
        <a
          href='https://files-statics-protegeme.s3.amazonaws.com/Politica+deprotecciondedatos-min.pdf'
          className='underline underline-offset-4 text-blue-800 my-3 font-semibold '
        >
          Terminos y Condiciones
        </a>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleScreenFull}
        >
          Comenzar prueba
        </button>
      </div>
      <Countdown
        date={timestap}
        intervalDelay={0}
        precision={3}
        renderer={(props) => props.completed === true && <ModalExpireTime />}
      />
      {isIphone ? (
        <TestIphone
          showTest={showTest}
          numbersBySquare={numbersBySquare}
          handle={handle}
          handleTap={handleTap}
          numberSquareInWidth={numberSquareInWidth}
          heightSquare={heightSquare}
          options={options}
        />
      ) : (
        <TestAndroid
          showTest={showTest}
          numbersBySquare={numbersBySquare}
          handle={handle}
          handleTap={handleTap}
          numberSquareInWidth={numberSquareInWidth}
          heightSquare={heightSquare}
          options={options}
        />
      )}
    </div>
  );
};
export default Test;
