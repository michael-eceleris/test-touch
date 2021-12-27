import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useFullScreenHandle } from "react-full-screen";
import { useLocation } from "react-router-dom";
import Countdown from "react-countdown";
import { When } from "react-if";
import { Unless } from "react-if";

import { useMobile } from "../hooks/useMobile";
import TestIphone from "./TestIphone";
import TestAndroid from "./TestAndroid";
import { useSquares } from "../provider/squareProvider";
import { useModal } from "../provider/modalProvider";
import ModalExpireTime from "./ModalTimeExpire";
import ModalStart from "./ModalStart";
import ModalTestOk from "./ModalTestOk";
import TestOk from "./TestOk";
import ModalIncompatible from "./ModalIncompatible";
import { usePostSendCode } from "../services/sendCode/useSendCode";
const Test = () => {
  const handle = useFullScreenHandle();
  const [widthDevice, setWidthDevice] = useState(0);
  const [heightDevice, setHeightDevide] = useState(0);
  const [heightSquare, setHeightSquare] = useState(0);
  const [numbersBySquare, setNumbersBySquare] = useState(null);
  const [modalExpire, setModalExpire] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const { isIphone, isMobile } = useMobile();
  const {
    squareHeight: numberSquareInHeigth,
    squareWidth: numberSquareInWidth,
    setSquareHeight,
    setSquareWidth,
  } = useSquares();
  const { openModalTestOk, showModalStart, showModalTestOk } = useModal();
  const { mutateAsync: postCode } = usePostSendCode();
  let selectSquares = [];
  const { search } = useLocation();
  /* const numberSquareInHeigth = 6;
  const numberSquareInWidth = 4; */
  const query = new URLSearchParams(search);
  const paramToken = query.get("touchId");
  const paramTimeStap = query.get("expiredAt");
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
      "blue";
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
      openModalTestOk();
      postCode({
        test: true,
        token: paramToken,
      })
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const handleScreenFull = () => {
    handle.enter();
    setShowTest((ev) => !ev);
  };

  return (
    <div className='flex justify-center items-center flex-col h-screen'>
      <Countdown
        date={paramTimeStap}
        intervalDelay={0}
        precision={3}
        renderer={(props) => {
          setModalExpire(props.completed);
          return <ModalExpireTime />;
        }}
      />
      <When condition={modalExpire}>
        <TestIphone
          showTest={modalExpire}
          numbersBySquare={numbersBySquare}
          handle={handle}
          handleTap={handleTap}
          numberSquareInWidth={numberSquareInWidth}
          heightSquare={heightSquare}
          options={options}
        />
      </When>
      <When condition={showModalStart && isMobile && !modalExpire}>
        <ModalStart onClose={handleScreenFull} />
        <TestIphone
          showTest={showModalStart}
          numbersBySquare={numbersBySquare}
          handle={handle}
          handleTap={handleTap}
          numberSquareInWidth={numberSquareInWidth}
          heightSquare={heightSquare}
          options={options}
        />
      </When>
      <When condition={!isMobile && !modalExpire}>
        <ModalIncompatible />
      </When>
      <When condition={showModalTestOk && isMobile && !modalExpire}>
        <ModalTestOk />
        <TestOk
          showTest={showModalTestOk}
          numbersBySquare={numbersBySquare}
          handle={handle}
          handleTap={handleTap}
          numberSquareInWidth={numberSquareInWidth}
          heightSquare={heightSquare}
          options={options}
        />
      </When>
      <Unless condition={showModalTestOk && isMobile && !modalExpire}>
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
      </Unless>
    </div>
  );
};
export default Test;
