import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useFullScreenHandle } from "react-full-screen";

const FullScreenContext = createContext();

export const FullScreenProviders = ({ children }) => {
  const [showTest, setShowTest] = useState(false);

  const handle = useFullScreenHandle();

  return (
    <FullScreenContext.Provider
      value={{
        handle,
        setShowTest,
        showTest,
      }}
      children={children}
    />
  );
};

export const useFullScreen = () => {
  const squares = useContext(FullScreenContext);
  return squares;
};
