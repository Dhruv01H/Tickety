import React from "react";
import { SeatPopup, SeatSelection } from "../../components/component_index";
import { useNavigate } from "react-router-dom";

function BookTickets() {
  const navigate = useNavigate();
  
  return (
    <div className="relative">
      {/* Close Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-8 right-8 z-50 text-gray-600 hover:text-gray-800 transition-colors duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <SeatPopup /> 
      <SeatSelection />
    </div>
  );
}

export default BookTickets;
