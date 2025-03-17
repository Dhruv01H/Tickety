import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const iconList = [
  { id: 1, icon: assets.bycicle },
  { id: 2, icon: assets.motorbike },
  { id: 3, icon: assets.rikshaw },
  { id: 4, icon: assets.car },
  { id: 5, icon: assets.car },
  { id: 6, icon: assets.carbig },
  { id: 7, icon: assets.carbig },
  { id: 8, icon: assets.minibus },
  { id: 9, icon: assets.minibus },
  { id: 10, icon: assets.minibus },
];

function SeatPopup() {
  const { selectedSeats, setSelectedSeats, setIsPopupOpen, isPopupOpen } = useContext(AppContext);
  const selectedIcon = iconList.find((item) => item.id === selectedSeats);

  const handleSeatSelect = (seatNumber) => {
    setSelectedSeats(seatNumber);
  };

  const onClickHandler = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      {isPopupOpen && (
        <>
        <div className="absolute w-full h-[130vh] bg-black/70 backdrop-blur-xs"></div>
          <div className="fixed flex items-center justify-center top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
            <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-2xl">
              <div className="flex flex-col items-center">
                <h2 className="mb-4 text-2xl font-semibold">How Many Seats?</h2>
                <img
                  src={selectedIcon?.icon || assets.motorbike}
                  alt="Dynamic Icon"
                  className="w-24 h-24 mb-6"
                />
                <div className="grid grid-cols-5 gap-4 mb-6 md:flex md:gap-2.5">
                  {Array.from({ length: 10 }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handleSeatSelect(i + 1)}
                      className={`w-10 h-10 flex cursor-pointer items-center font-medium justify-center rounded-lg transition-all ${
                        selectedSeats === i + 1
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div className="flex justify-around w-full mb-6 text-sm">
                  <div>
                    <p className="font-semibold">Platinum</p>
                    <p>Rs. 179</p>
                    <p className="text-green-600">Available</p>
                  </div>
                  <div>
                    <p className="font-semibold">Gold</p>
                    <p>Rs. 149</p>
                    <p className="text-green-600">Available</p>
                  </div>
                  <div>
                    <p className="font-semibold">SIlver</p>
                    <p>Rs. 129</p>
                    <p className="text-green-600">Available</p>
                  </div>
                </div>
                <button
                  onClick={onClickHandler}
                  className="px-6 py-2 font-medium text-white transition duration-300 rounded-full cursor-pointer bg-primary hover:bg-secondary hover:scale-105"
                >
                  Select Seats
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SeatPopup;
