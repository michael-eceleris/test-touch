import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularProgress = (props) => {
  return (
    <div className='w-14 h-14 absolute top-0 right-0 mt-2 mr-4 z-50'>
      <CircularProgressbar
        value={
          props.completed === true
            ? 0
            : props.totalTime
            ? (props.total * 100) / props.totalTime
            : 100
        }
        text={
          props.minutes > 0
            ? `${props.minutes}:${props.seconds.toString().padStart(2, 0)}`
            : `${props.seconds.toString().padStart(2, 0)}`
        }
        background
        backgroundPadding={2}
        styles={buildStyles({
          backgroundColor: "#3e98c7",
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent",
        })}
      />
    </div>
  );
};

export default CircularProgress;
