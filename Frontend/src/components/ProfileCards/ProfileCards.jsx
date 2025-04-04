import React, { useState, useEffect } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

function ProfileCards() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [transferLoading, setTransferLoading] = useState(false);
  const [transferError, setTransferError] = useState(null);
  const [transferSuccess, setTransferSuccess] = useState(false);

  const fetchTicketStatus = async (seat) => {
    try {
      console.log("Fetching status for seat:", seat);
      const statusResponse = await axios.get(`http://localhost:8080/api/auth/ticket-status/${seat}`, {
        withCredentials: true
      });
      console.log("Status response:", statusResponse.data);
      return statusResponse.data.status;
    } catch (err) {
      console.error(`Error fetching status for seat ${seat}:`, err);
      return 'Unused';
    }
  };

  const refreshBookingStatuses = async () => {
    console.log("Refreshing booking statuses...");
    const updatedBookings = await Promise.all(bookings.map(async (booking) => {
      const seatStatuses = await Promise.all(booking.ticketNumbers.map(fetchTicketStatus));
      console.log("Seat statuses for booking", booking.id, ":", seatStatuses);
      const isUsed = seatStatuses.some(status => status === 'Used');
      return {
        ...booking,
        status: isUsed ? 'Used' : 'Unused'
      };
    }));
    console.log("Updated bookings:", updatedBookings);
    setBookings(updatedBookings);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const sessionResponse = await axios.get('http://localhost:8080/api/auth/session', {
          withCredentials: true
        });

        if (!sessionResponse.data || !sessionResponse.data.walletAddress) {
          setError('No wallet address found. Please log in.');
          setLoading(false);
          return;
        }

        const walletAddress = sessionResponse.data.walletAddress;
        const seatsResponse = await axios.get(`http://localhost:8080/api/auth/seats/${walletAddress}`);
        
        if (seatsResponse.data && seatsResponse.data.seatNumbers) {
          // Group seats based on their sequential order
          const seatGroups = [];
          let currentGroup = [];
          let previousSeat = null;
          
          const sortedSeats = [...seatsResponse.data.seatNumbers].sort();
          
          sortedSeats.forEach((seat) => {
            if (previousSeat === null) {
              currentGroup = [seat];
              previousSeat = seat;
            } else {
              const prevRow = previousSeat.charAt(0);
              const prevNum = parseInt(previousSeat.slice(1));
              const currentRow = seat.charAt(0);
              const currentNum = parseInt(seat.slice(1));
              
              if (prevRow === currentRow && currentNum === prevNum + 1) {
                currentGroup.push(seat);
                previousSeat = seat;
              } else {
                if (currentGroup.length > 0) {
                  seatGroups.push([...currentGroup]);
                }
                currentGroup = [seat];
                previousSeat = seat;
              }
            }
          });
          
          if (currentGroup.length > 0) {
            seatGroups.push(currentGroup);
          }

          // Create bookings with initial statuses
          const bookingsList = await Promise.all(seatGroups.map(async (group, index) => {
            const seatStatuses = await Promise.all(group.map(fetchTicketStatus));
            const isUsed = seatStatuses.some(status => status === 'Used');

            return {
              id: `booking-${index + 1}`,
              title: `Booking ${index + 1}`,
              description: `${group.length} ticket${group.length > 1 ? 's' : ''} booked together`,
              runtime: "Active",
              genre: "Movie Tickets",
              ticketNumbers: group,
              status: isUsed ? 'Used' : 'Unused',
              ticketId: `TKT-${Date.now()}-${index}`
            };
          }));

          setBookings(bookingsList);
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load your bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const statusInterval = setInterval(refreshBookingStatuses, 10000); // Refresh every 10 seconds
    return () => clearInterval(statusInterval);
  }, [bookings]);

  const handleTransfer = async () => {
    if (!recipientEmail || !selectedBooking) return;

    setTransferLoading(true);
    setTransferError(null);
    setTransferSuccess(false);

    try {
      const response = await axios.post('http://localhost:8080/api/auth/transfer-tickets', {
        recipientEmail,
        seatNumbers: selectedBooking.ticketNumbers
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        setTransferSuccess(true);
        // Refresh bookings after successful transfer
        const sessionResponse = await axios.get('http://localhost:8080/api/auth/session', {
          withCredentials: true
        });
        const walletAddress = sessionResponse.data.walletAddress;
        const seatsResponse = await axios.get(`http://localhost:8080/api/auth/seats/${walletAddress}`);
        
        if (seatsResponse.data && seatsResponse.data.seatNumbers) {
          // Update bookings state with new data
          // ... (same grouping logic as in useEffect)
        }
      }
    } catch (err) {
      setTransferError(err.response?.data?.error || 'Failed to transfer tickets. Please try again.');
    } finally {
      setTransferLoading(false);
    }
  };

  const openTransferModal = (booking) => {
    setSelectedBooking(booking);
    setShowTransferModal(true);
  };

  const closeTransferModal = () => {
    setShowTransferModal(false);
    setSelectedBooking(null);
    setRecipientEmail("");
    setTransferError(null);
    setTransferSuccess(false);
  };

  const openPopup = (movie) => {
    setSelectedMovie(movie);
  };

  const closePopup = () => {
    setSelectedMovie(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading your bookings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="px-10 py-6 mb-20 sm:px-14 md:px-20 lg:px-28 xl:px-32 2xl:px-40">
        <h2 className="mb-8 text-4xl font-medium">Your Movie Bookings</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 p-6 rounded-md shadow-md bg-white/30"
            >
              <h4 className="text-2xl font-medium">
                <i className="ri-film-line mr-4 text-primary"></i> {item.title}
              </h4>
              <p>{item.description}</p>
              <p className="text-sm font-light">
                <i className="ri-time-line mr-1 text-primary"></i> {item.runtime}
              </p>
              <p className="text-sm font-light">
                <i className="ri-checkbox-circle-line mr-1 text-primary"></i> Status: {item.status}
              </p>
              <div className="mt-2 border-t border-gray-300"></div>
              <div className="flex flex-wrap gap-2">
                {item.ticketNumbers.map((ticket, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium text-white bg-primary rounded-full"
                  >
                    {ticket}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => openPopup(item)} 
                  className="flex-1 py-2 transition duration-500 rounded-md cursor-pointer bg-gray-200/50 hover:text-frost hover:bg-primary"
                >
                  View Details
                </button>
                <button 
                  onClick={() => openTransferModal(item)}
                  disabled={item.status === 'Used'}
                  className={`flex-1 py-2 transition duration-500 rounded-md ${
                    item.status === 'Used' 
                    ? 'bg-gray-300 cursor-not-allowed opacity-50' 
                    : 'bg-green-200/50 hover:text-frost hover:bg-green-500 cursor-pointer'
                  }`}
                >
                  Transfer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="flex flex-col w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-3xl font-semibold text-center">
              Transfer Tickets
            </h3>
            <p className="mb-4 text-lg">
              Transfer these tickets to another user:
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedBooking.ticketNumbers.map((ticket, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm font-medium text-white bg-primary rounded-full"
                >
                  {ticket}
                </span>
              ))}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Recipient's Email
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter recipient's email"
              />
            </div>
            {transferError && (
              <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-md">
                {transferError}
              </div>
            )}
            {transferSuccess && (
              <div className="p-3 mb-4 text-green-700 bg-green-100 rounded-md">
                Tickets transferred successfully!
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={handleTransfer}
                disabled={transferLoading || !recipientEmail}
                className={`flex-1 px-4 py-2 text-white transition duration-300 rounded-md cursor-pointer bg-primary hover:bg-secondary ${
                  (transferLoading || !recipientEmail) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {transferLoading ? 'Transferring...' : 'Transfer Tickets'}
              </button>
              <button
                onClick={closeTransferModal}
                className="flex-1 px-4 py-2 text-gray-700 transition duration-300 rounded-md cursor-pointer bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Popup Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="flex flex-col w-full max-w-xl p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-3xl font-semibold text-center">
              {selectedMovie.title}
            </h3>
            <p className="mb-3 text-lg">
              <strong>Description :</strong> {selectedMovie.description}
            </p>
            <p className="mb-3 text-lg">
              <strong>Genre :</strong> {selectedMovie.genre}
            </p>
            <p className="mb-3 text-lg">
              <strong>Status :</strong> {selectedMovie.runtime}
            </p>
            <div className="mb-3">
              <strong className="text-lg">Ticket Numbers :</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedMovie.ticketNumbers.map((ticket, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium text-white bg-primary rounded-full"
                  >
                    {ticket}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center mb-4">
              <QRCodeSVG 
                value={`${selectedMovie.title}\nSeats: ${selectedMovie.ticketNumbers.join(", ")}\nGenre: ${selectedMovie.genre}\nDuration: ${selectedMovie.runtime}\nTicket ID: ${selectedMovie.ticketNumbers[0]}\nStatus: ${selectedMovie.status || 'Unused'}`}
                size={200}
                level="H"
                includeMargin={true}
              />
              <p className="mt-2 text-sm text-gray-600">Scan this QR code for ticket details</p>
            </div>
            <button
              className="px-4 py-2 mt-2 text-white transition duration-300 rounded-md cursor-pointer bg-primary hover:bg-secondary"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileCards;
