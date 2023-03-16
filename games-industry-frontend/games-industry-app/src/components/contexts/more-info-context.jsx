import { useState, createContext } from "react";

export const MoreInfoContext = createContext({
  setIsMoreInfoVisible: () => false,
  isMoreInfoVisible: false,
});

export const MoreInfoProvider = ({ children }) => {
  const [isMoreInfoVisible, setIsMoreInfoVisible] = useState(false);

  const moreInfoStyles = {
    visibility: isMoreInfoVisible ? "visible" : "hidden",
    opacity: isMoreInfoVisible ? 0.9 : 0,
    transition: isMoreInfoVisible && "1s",
  };

  const value = { isMoreInfoVisible, setIsMoreInfoVisible, moreInfoStyles };

  return (
    <MoreInfoContext.Provider value={value}>
      {children}
    </MoreInfoContext.Provider>
  );
};
