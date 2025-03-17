import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const seatLayout = [
  { category: "Rs. 179 Platinum", rows: ["N", "M"], seats: 20 },
  { category: "Rs. 149 Gold", rows: ["L", "K", "J", "I", "H", "G", "F", "E", "D", "C"], seats: 20 },
  { category: "Rs. 119 Silver", rows: ["B", "A"], seats: 20 },
];

const SeatSelection = () => {
  const { selectedSeats } = useContext(AppContext);
  const [bookedSeats, setBookedSeats] = useState(new Set()); // Simulating booked seats
  const [userSelectedSeats, setUserSelectedSeats] = useState(new Set());

  // Function to check if a seat is booked
  const isBooked = (row, seat) => bookedSeats.has(`${row}${seat}`);

  // Function to handle seat selection logic
  const handleSeatSelection = (row, seat) => {
    const seatKey = `${row}${seat}`;
    
    // If the seat is already selected, deselect all selected seats
    if (userSelectedSeats.has(seatKey)) {
      setUserSelectedSeats(new Set());
      return;
    }

    if (isBooked(row, seat)) return; // Ignore if the selected seat is booked

    let selected = new Set();
    selected.add(seatKey);
    
    let rightSelected = 0;
    let leftSelected = 0;

    // Try selecting seats to the right
    for (let i = 1; i < selectedSeats; i++) {
      let nextSeat = seat + i;
      if (nextSeat <= seatLayout.find((section) => section.rows.includes(row)).seats && !isBooked(row, nextSeat)) {
        selected.add(`${row}${nextSeat}`);
        rightSelected++;
      } else {
        break;
      }
    }

    // If right selection is incomplete, try selecting to the left
    for (let i = 1; rightSelected + leftSelected < selectedSeats; i++) {
      let prevSeat = seat - i;
      if (prevSeat > 0 && !isBooked(row, prevSeat)) {
        selected.add(`${row}${prevSeat}`);
        leftSelected++;
      } else {
        break;
      }
    }

    setUserSelectedSeats(selected);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {seatLayout.map((section, index) => (
        <div key={index} className="w-full max-w-5xl my-4">
          <h2 className="mb-2 text-lg font-semibold text-primary">{section.category}</h2>
          <div className="flex flex-col justify-center space-y-3.5">
            {section.rows.map((row) => (
              <div key={row} className="flex items-center space-x-4">
                <span className="w-6 font-medium text-primary">{row}</span>
                <div className="flex gap-3 pb-1 overflow-x-auto">
                  {[...Array(section.seats)].map((_, i) => {
                    const seatNumber = i + 1;
                    const seatKey = `${row}${seatNumber}`;
                    const isSelected = userSelectedSeats.has(seatKey);
                    const booked = isBooked(row, seatNumber);

                    return (
                      <div
                        key={seatNumber}
                        onClick={() => handleSeatSelection(row, seatNumber)}
                        className={`w-8 h-8 flex items-center justify-center border-2 rounded-md text-sm font-semibold transition duration-300 
                          ${booked ? "bg-gray-400 cursor-not-allowed" : isSelected ? "bg-primary text-white cursor-pointer" : "bg-green-100 cursor-pointer"}`}
                      >
                        {seatNumber}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="max-w-5xl px-4 py-2 mt-4 text-blue-800 bg-blue-100 rounded-md shadow-md">
        All eyes this way please!
      </button>
    </div>
  );
};

export default SeatSelection;
