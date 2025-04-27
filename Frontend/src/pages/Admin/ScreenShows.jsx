import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ScreenShows() {
  const [screens, setScreens] = useState([]);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScreens();
  }, []);

  useEffect(() => {
    if (selectedScreen) {
      console.log('Selected screen:', selectedScreen);
      fetchShowsForScreen(selectedScreen.screenNumber);
    }
  }, [selectedScreen]);

  const fetchScreens = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/screens");
      console.log('Fetched screens:', response.data);
      setScreens(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching screens:", error);
      toast.error("Failed to fetch screens");
      setLoading(false);
    }
  };

  const fetchShowsForScreen = async (screenNumber) => {
    try {
      console.log('Fetching shows for screen:', screenNumber);
      const response = await axios.get(`http://localhost:8080/api/events/shows/screen/${screenNumber}`);
      console.log('Fetched shows:', response.data);
      setShows(response.data);
    } catch (error) {
      console.error("Error fetching shows:", error);
      toast.error("Failed to fetch shows for this screen");
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-8 text-4xl font-bold text-primary">Screen Shows</h1>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Screens List */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">Screens</h2>
          <div className="space-y-4">
            {screens.map((screen) => (
              <div
                key={screen.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedScreen?.id === screen.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary'
                }`}
                onClick={() => {
                  console.log('Screen clicked:', screen);
                  setSelectedScreen(screen);
                }}
              >
                <h3 className="text-lg font-medium">Screen {screen.screenNumber}</h3>
                <p className="text-sm text-gray-600">
                  Type: {screen.screenType} | Capacity: {screen.capacity} seats
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Shows List */}
        <div className="lg:col-span-2">
          {selectedScreen ? (
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-2xl font-semibold">
                Shows for Screen {selectedScreen.screenNumber}
              </h2>
              {shows.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-xl text-gray-600">No shows scheduled for this screen</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {shows.map((show) => (
                    <div
                      key={show.id}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <h3 className="text-lg font-medium">{show.movie_name}</h3>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-sm text-gray-600">Show Time</p>
                          <p className="font-medium">{formatDateTime(show.dateTime)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-medium">{show.event?.duration} minutes</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Price</p>
                          <p className="font-medium">₹{show.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-xl text-gray-600">Select a screen to view its shows</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScreenShows; 