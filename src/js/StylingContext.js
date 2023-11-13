import React, { createContext, useContext, useState } from "react";

const StylingContext = createContext();

export function StylingProvider({ children }) {
  const [fontSize, setFontSize] = useState("");
  const [fontColor, setFontColor] = useState("");
  const [fontBackgroundColor, setFontBackgroundColor] = useState("");

  const contextValue = {
    fontSize,
    setFontSize,
    fontColor,
    setFontColor,
    fontBackgroundColor,
    setFontBackgroundColor,
  };

  return (
    <StylingContext.Provider value={contextValue}>
      {children}
    </StylingContext.Provider>
  );
}

export const useStyling = () => {
  return useContext(StylingContext);
};


/*
import { createContext, useContext, useState } from "react";

const StylingContext = createContext();

export function StylingProvider({children}) {
  return(
    <StylingContext.Provider value={{ item: 1 }}>{children}</StylingContext.Provider>
  )
}

export default StylingContext;





export const StylingProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState("");
  const [fontColor, setFontColor] = useState("");
  const [fontBackgroundColor, setFontBackgroundColor] = useState("");

  return (
    <StylingContext.Provider
      value={{
        fontSize,
        setFontSize,
        fontColor,
        setFontColor,
        fontBackgroundColor,
        setFontBackgroundColor
      }}
    >
      {children}
    </StylingContext.Provider>
  );
};

export const useStyling = () => {
  return useContext(StylingContext);
};
*/
