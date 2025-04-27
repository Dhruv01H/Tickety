import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Showtime() {
  const [events, setEvents] = useState([]);
  const [screens, setScreens] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showData, setShowData] = useState({
    screenNumber: "",
    dateTime: "",
    price: ""
  });
  const dateInputRef = useRef(null);

  // Fetch all events and screens when component mounts
  useEffect(() => {
    fetchEvents();
    fetchScreens();
    
    // Add event listener to the date input to enforce minimum date
    const dateInput = document.getElementById('dateTime');
    if (dateInput) {
      dateInput.addEventListener('change', enforceMinDate);
    }
    
    return () => {
      if (dateInput) {
        dateInput.removeEventListener('change', enforceMinDate);
      }
    };
  }, []);

  const enforceMinDate = (e) => {
    const selectedDate = new Date(e.target.value);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    if (selectedDate < tomorrow) {
      toast.error("Showtime must be at least 1 day in advance");
      e.target.value = ""; // Clear the invalid date
      setShowData(prev => ({
        ...prev,
        dateTime: ""
      }));
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/events/get");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to fetch events");
    }
  };

  const fetchScreens = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/screens");
      setScreens(response.data);
    } catch (error) {
      console.error("Error fetching screens:", error);
      toast.error("Failed to fetch screens");
    }
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setShowData({
      screenNumber: "",
      dateTime: "",
      price: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShowData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) {
      toast.error("Please select a movie first");
      return;
    }

    // Validate showtime is at least 1 day in advance
    const selectedDate = new Date(showData.dateTime);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    if (selectedDate < tomorrow) {
      toast.error("Showtime must be at least 1 day in advance");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/events/${selectedEvent.id}/shows`,
        {
          screenNumber: parseInt(showData.screenNumber),
          dateTime: showData.dateTime,
          price: parseFloat(showData.price)
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Showtime added successfully!");
      setShowData({
        screenNumber: "",
        dateTime: "",
        price: ""
      });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data || "Failed to add showtime");
    }
  };

  // Calculate tomorrow's date for the min attribute
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 16);
  };

  return (
    <div className="p-6">
      <h1 className="mb-8 text-4xl font-bold text-primary">Add Showtime</h1>

      {/* Movie Selection */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Select Movie</h2>
        {events.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-xl text-gray-600">No movies available to add showtime</p>
            <p className="mt-2 text-sm text-gray-500">Please add movies first before adding showtimes</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className={`overflow-hidden border rounded-lg cursor-pointer transition-all ${
                  selectedEvent?.id === event.id
                    ? "border-primary bg-primary/10"
                    : "border-gray-200 hover:border-primary"
                }`}
                onClick={() => handleEventSelect(event)}
              >
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={event.show_image_url}
                    alt={event.show_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x225?text=No+Image";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold line-clamp-1">{event.show_name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">{event.show_description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Showtime Form */}
      {selectedEvent && (
        <form onSubmit={handleSubmit} className="max-w-2xl">
          <div className="mb-6">
            <label htmlFor="screenNumber" className="block mb-2 font-medium text-gray-700">
              Select Screen
            </label>
            <select
              id="screenNumber"
              name="screenNumber"
              value={showData.screenNumber}
              onChange={handleInputChange}
              className="w-full p-4 text-gray-800 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              required
            >
              <option value="">Select a screen</option>
              {screens.map((screen) => (
                <option key={screen.id} value={screen.screenNumber}>
                  Screen {screen.screenNumber} - {screen.screenType} ({screen.capacity} seats)
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="dateTime" className="block mb-2 font-medium text-gray-700">
              Show Date & Time
            </label>
            <div className="space-y-2">
              <input
                type="datetime-local"
                id="dateTime"
                name="dateTime"
                value={showData.dateTime}
                onChange={handleInputChange}
                className="w-full p-4 text-gray-800 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                required
                min={getTomorrowDate()}
                ref={dateInputRef}
              />
              <p className="text-sm text-gray-500 italic">
                Note: Showtimes must be scheduled at least 24 hours in advance to allow for proper preparation and promotion.
              </p>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="price" className="block mb-2 font-medium text-gray-700">
              Ticket Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={showData.price}
              onChange={handleInputChange}
              className="w-full p-4 text-gray-800 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder="Enter ticket price"
              required
              min="0"
              step="0.01"
            />
          </div>

          <button
            type="submit"
            className="px-8 py-3.5 cursor-pointer font-medium text-white transition-colors duration-200 rounded-md bg-primary hover:bg-pink-600 shadow-md"
          >
            Add Showtime
          </button>
        </form>
      )}
    </div>
  );
}

export default Showtime;
