import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useFullScreenHandle } from "react-full-screen";
import { useLocation } from "react-router-dom";
import Countdown from "react-countdown";
import { When } from "react-if";
import { Unless } from "react-if";
import { Switch } from "react-if";
import { Case } from "react-if";

import { useMobile } from "../hooks/useMobile";
import TestIphone from "./TestIphone";
import TestAndroid from "./TestAndroid";
/* import TestAndroidBack from "./TestAndroidBack"; */
import { useSquares } from "../provider/squareProvider";
import { useModal } from "../provider/modalProvider";
import ModalExpireTime from "./ModalTimeExpire";
import ModalStart from "./ModalStart";
import ModalTestOk from "./ModalTestOk";
import TestOk from "./TestOk";
import ModalIncompatible from "./ModalIncompatible";
import { usePostSendCode } from "../services/sendCode/useSendCode";
import CircularCountDown from "./CircularProgress";

const Test = () => {
  const handle = useFullScreenHandle();
  const [widthDevice, setWidthDevice] = useState(0);
  const [heightDevice, setHeightDevide] = useState(0);
  const [heightSquare, setHeightSquare] = useState(0);
  const [numbersBySquare, setNumbersBySquare] = useState(null);
  const [modalExpire, setModalExpire] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [totalTime, setTotalTime] = useState(null);
  const { isIphone, isMobile } = useMobile();
  const {
    squareHeight: numberSquareInHeigth,
    squareWidth: numberSquareInWidth,
    setSquareHeight,
    setSquareWidth,
  } = useSquares();
  const {
    openModalTestOk,
    showModalStart,
    showModalTestOk,
    setIsLoading,
    setIsSuccess,
    setIsError,
    setIsErrorTouch,
  } = useModal();
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
      for (let i = 1; i < 120; i++) {
        if (
          (window.screen.availHeight - window.screen.availHeight * 0.1727) /
            i <=
          50
        ) {
          setSquareHeight(
            (window.screen.availHeight - window.screen.availHeight * 0.1727) / i
          );
          break;
        } else {
          continue;
        }
      }
      setHeightDevide(
        window.screen.availHeight - window.screen.availHeight * 0.1727
      );
    } else {
      for (let i = 1; i < 120; i++) {
        if (
          (window.screen.availHeight - window.screen.availHeight * 0.04) / i <=
          50
        ) {
          setSquareHeight(
            (window.screen.availHeight - window.screen.availHeight * 0.04) / i
          );
          break;
        } else {
          continue;
        }
      }
      setHeightDevide(
        window.screen.availHeight - window.screen.availHeight * 0.04
      );
    }
    for (let i = 1; i < 120; i++) {
      if (window.screen.availWidth / i <= 30) {
        setSquareWidth(window.screen.availWidth / i);
        break;
      } else {
        continue;
      }
    }
    setWidthDevice(window.screen.availWidth);
    /* setSquareWidth(Math.trunc(window.screen.availWidth / 40)); */
    measureSquare();
    setNumbersArray();
    //eslint-disable-next-line
  }, [widthDevice, heightDevice]);

  const measureSquare = () => {
    setHeightSquare(numberSquareInHeigth);
  };

  const setNumbersArray = () => {
    let data = [];
    for (
      let i = 1;
      i <=
      (heightDevice / numberSquareInHeigth) *
        (widthDevice / numberSquareInWidth);
      i++
    ) {
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
    let percentageX = Math.floor(
      x / (widthDevice / (widthDevice / numberSquareInWidth))
    );
    let percentageY = Math.floor(
      y / (heightDevice / (heightDevice / numberSquareInHeigth))
    );
    i = percentageX + (widthDevice / numberSquareInWidth) * percentageY;
    document.getElementById(`square_${numbersBySquare[i]}`).style.background =
      "rgb(34 197 94)";
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
      setIsLoading(true);
      setShowTest((ev) => !ev);
      postCode({
        touchId: paramToken,
      })
        .then((res) => {
          if (res.data && res.data.status === 200) {
            setIsSuccess(true);
          } else {
            setIsError(true);
          }
        })
        .catch((err) => {
          if (
            err.response.data.error.code === 400 &&
            err.response.data.error.message === "expired touchId"
          ) {
            setIsErrorTouch(true);
          } else {
            setIsError(true);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleScreenFull = () => {
    handle.enter();
    setShowTest((ev) => !ev);
  };

  return (
    <div className='flex justify-center items-center h-screen w-screen'>
      <Countdown
        date={paramTimeStap}
        intervalDelay={0}
        precision={0}
        renderer={(props) => {
          if (totalTime === null) {
            setTotalTime(props.total);
          }
          setModalExpire(props.completed);
          return (
            <CircularCountDown
              completed={props.completed || showModalTestOk}
              total={props.total}
              minutes={showModalTestOk ? 0 : props.minutes}
              seconds={showModalTestOk ? 0 : props.seconds}
              totalTime={totalTime}
            />
          );
        }}
      />
      <When condition={modalExpire}>
        <ModalExpireTime />
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
        <Switch>
          <Case condition={isIphone}>
            <TestIphone
              showTest={showTest}
              numbersBySquare={numbersBySquare}
              handle={handle}
              handleTap={handleTap}
              numberSquareInWidth={numberSquareInWidth}
              heightSquare={heightSquare}
              options={options}
              paramTimeStap={paramTimeStap}
              setModalExpire={setModalExpire}
              modalExpire={modalExpire}
              totalTime={totalTime}
              setTotalTime={setTotalTime}
              showModalTestOk={showModalTestOk}
            />
          </Case>
          {/* <Case
            condition={
              !isIphone && showTest === true && handle.active === false
            }
          >
            <TestAndroidBack
              showTest={showTest}
              numbersBySquare={numbersBySquare}
              handle={handle}
              handleTap={handleTap}
              numberSquareInWidth={numberSquareInWidth}
              heightSquare={heightSquare}
              options={options}
              paramTimeStap={paramTimeStap}
              setModalExpire={setModalExpire}
              modalExpire={modalExpire}
              totalTime={totalTime}
              setTotalTime={setTotalTime}
            />
          </Case> */}
          <Case condition={!isIphone}>
            <TestAndroid
              showTest={showTest}
              numbersBySquare={numbersBySquare}
              handle={handle}
              handleTap={handleTap}
              numberSquareInWidth={numberSquareInWidth}
              heightSquare={heightSquare}
              options={options}
              paramTimeStap={paramTimeStap}
              setModalExpire={setModalExpire}
              modalExpire={modalExpire}
              totalTime={totalTime}
              setTotalTime={setTotalTime}
            />
          </Case>
        </Switch>
      </Unless>
    </div>
  );
};
export default Test;
