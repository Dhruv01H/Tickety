import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const seatLayout = [
  { category: "Rs. 179 Platinum", rows: ["N", "M"], seats: 20, price: 179 },
  {
    category: "Rs. 149 Gold",
    rows: ["L", "K", "J", "I", "H", "G", "F", "E", "D", "C"],
    seats: 20,
    price: 149,
  },
  { category: "Rs. 119 Silver", rows: ["B", "A"], seats: 20, price: 119 },
];

const SeatSelection = () => {
  const { selectedSeats } = useContext(AppContext);
  const [bookedSeats, setBookedSeats] = useState(
    new Set(["N1", "M5", "L10", "K15"])
  ); // Example booked seats
  const [userSelectedSeats, setUserSelectedSeats] = useState(new Set());
  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility
  const [bookingDetails, setBookingDetails] = useState({
    seatCount: 0,
    seatNumbers: [],
    totalPrice: 0,
  }); // State to hold booking details

  // Function to check if a seat is booked
  const isBooked = (row, seat) => bookedSeats.has(`${row}${seat}`);

  // Function to handle seat selection logic
  const handleSeatSelection = (row, seat) => {
    const seatKey = `${row}${seat}`;
    if (isBooked(row, seat)) return; // Ignore selection for booked seats

    if (userSelectedSeats.has(seatKey)) {
      setUserSelectedSeats(new Set()); // Reset selection
      return;
    }

    let selected = new Set();
    selected.add(seatKey);
    let rightSelected = 0;
    let leftSelected = 0;

    for (let i = 1; i < selectedSeats; i++) {
      let nextSeat = seat + i;
      if (
        nextSeat <=
          seatLayout.find((section) => section.rows.includes(row)).seats &&
        !isBooked(row, nextSeat)
      ) {
        selected.add(`${row}${nextSeat}`);
        rightSelected++;
        if (rightSelected + leftSelected + 1 === selectedSeats) break;
      } else {
        break;
      }
    }

    for (let i = 1; rightSelected + leftSelected + 1 < selectedSeats; i++) {
      let prevSeat = seat - i;
      if (prevSeat > 0 && !isBooked(row, prevSeat)) {
        selected.add(`${row}${prevSeat}`);
        leftSelected++;
        if (rightSelected + leftSelected + 1 === selectedSeats) break;
      } else {
        break;
      }
    }

    setUserSelectedSeats(selected);
  };

  // Function to handle booking confirmation
  const handleConfirmBooking = () => {
    let seatNumbers = Array.from(userSelectedSeats);
    let totalPrice = 0;

    seatNumbers.forEach((seat) => {
      let row = seat.charAt(0);
      let section = seatLayout.find((section) => section.rows.includes(row));
      totalPrice += section ? section.price : 0;
    });

    setBookingDetails({
      seatCount: seatNumbers.length,
      seatNumbers,
      totalPrice,
    });
    setShowPopup(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 mt-5">
      {seatLayout.map((section, index) => (
        <div key={index} className="w-full max-w-4xl my-4">
          <h2 className="mb-2 text-lg font-semibold text-primary">
            {section.category}
          </h2>
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
                          ${
                            booked
                              ? "bg-gray-400 cursor-not-allowed"
                              : isSelected
                              ? "bg-primary text-white cursor-pointer"
                              : "bg-green-100 cursor-pointer"
                          }`}
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

      {userSelectedSeats.size > 0 ? (
        <div className="fixed bottom-0 left-0 flex justify-center w-full p-4 shadow-lg bg-white/60">
          <button
            className="px-6 py-2 transition duration-300 rounded-lg shadow-md bg-primary text-frost hover:bg-secondary "
            onClick={handleConfirmBooking}
          >
            Confirm Booking
          </button>
        </div>
      ) : (
        <button className="max-w-5xl px-4 py-2 mt-4 text-blue-800 bg-blue-100 rounded-md shadow-md">
          All eyes this way please!
        </button>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="flex flex-col p-8 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Booking Summary</h2>
            <p className="mb-2">Seats Selected: {bookingDetails.seatCount}</p>
            <p className="mb-2">Seat Numbers: {bookingDetails.seatNumbers.join(", ")}</p>
            <p className="mb-2">Total Price: Rs. {bookingDetails.totalPrice}</p>
            <button
              className="px-4 py-2 mt-4 text-white transition duration-300 rounded cursor-pointer bg-primary hover:bg-secondary"
              onClick={() => setShowPopup(false)}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
  