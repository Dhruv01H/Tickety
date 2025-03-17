import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [ selectedSeats, setSelectedSeats ] = useState(2)
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const value = {
    user,
    setUser,
    selectedSeats,
    setSelectedSeats,
    isPopupOpen,
    setIsPopupOpen,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;