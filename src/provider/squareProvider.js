import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

const SquaresContext = createContext();

export const SquaresProviders = ({ children }) => {
  const [squareWidth, setSquareWidth] = useState(1);
  const [squareHeight, setSquareHeight] = useState(1);
  return (
    <SquaresContext.Provider
      value={{
        squareHeight,
        squareWidth,
        setSquareHeight,
        setSquareWidth,
      }}
      children={children}
    />
  );
};

export const useSquares = () => {
  const squares = useContext(SquaresContext);
  return squares;
};
