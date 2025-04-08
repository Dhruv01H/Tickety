import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import jsQR from 'jsqr';
import { useNavigate } from 'react-router-dom';

function Scanner() {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup camera stream when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setIsCameraActive(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Failed to access camera. Please ensure camera permissions are granted.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      streamRef.current = null;
      setIsCameraActive(false);
    }
  };

  useEffect(() => {
    let animationFrameId;
    const scanQRCode = () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
          handleScan(code.data);
          stopCamera();
        }
      }
      animationFrameId = requestAnimationFrame(scanQRCode);
    };

    if (isCameraActive) {
      scanQRCode();
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isCameraActive]);

  const handleScan = async (data) => {
    if (isProcessing) {
      return;
    }

    setIsProcessing(true);
    try {
      // Parse the QR code data
      const lines = data.split('\n');
      const ticketData = {
        title: lines[0].split(': ')[1],
        seats: lines[1].split(': ')[1],
        genre: lines[2].split(': ')[1],
        duration: lines[3].split(': ')[1],
        ticketId: lines[4].split(': ')[1]
      };

      setScanResult(ticketData);

      // Fetch the current status from the backend
      try {
        const statusResponse = await axios.get(`http://localhost:8080/api/tickets/ticket-status/${ticketData.ticketId}`, {
          withCredentials: true
        });
        
        const currentStatus = statusResponse.data.status;
        console.log("Current ticket status:", currentStatus);
        
        // Check if ticket is already used
        if (currentStatus === 'Used') {
          setError('Ticket has already been used');
          setShowErrorModal(true);
          setSuccess(false);
          return;
        }

        // If ticket is unused, update its status
        const response = await axios.post('http://localhost:8080/api/tickets/update-ticket-status', {
          ticketId: ticketData.ticketId,
          status: 'Used'
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.success) {
          setSuccess(true);
          setError(null);
          
          // Get the user's session to get their wallet address
          const sessionResponse = await axios.get('http://localhost:8080/api/auth/session', {
            withCredentials: true
          });

          if (sessionResponse.data && sessionResponse.data.walletAddress) {
            await axios.get(`http://localhost:8080/api/tickets/seats/${sessionResponse.data.walletAddress}`, {
              withCredentials: true
            });
          }

          // Wait for 2 seconds to show success message before redirecting
          setTimeout(() => {
            navigate('/profile');
          }, 2000);
        } else {
          throw new Error(response.data.error || 'Failed to update ticket status');
        }
      } catch (err) {
        console.error('Error details:', err.response?.data || err.message);
        setError(err.response?.data?.error || err.message || 'Failed to update ticket status. Please try again.');
        setSuccess(false);
      }
    } catch (err) {
      console.error('Scan error:', err);
      setError('Invalid QR code format');
      setSuccess(false);
    } finally {
      // Add a delay before allowing next scan
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000); // 2 second delay between scans
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          
          if (code) {
            handleScan(code.data);
          } else {
            setError('No QR code found in the image');
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="mb-8 text-3xl font-bold">Ticket Scanner</h1>
      
      <div className="w-full max-w-md p-6 text-center bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Scan QR Code</h2>
        
        {/* Camera View */}
        <div className="relative w-full mb-4 overflow-hidden rounded-lg">
          <video
            ref={videoRef}
            className={`w-full ${isCameraActive ? 'block' : 'hidden'}`}
            autoPlay
            playsInline
          />
          {!isCameraActive && (
            <div className="flex flex-col items-center justify-center p-8 bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="mb-4 text-gray-600">Camera preview will appear here</p>
            </div>
          )}
        </div>

        {/* Camera Controls */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={isCameraActive ? stopCamera : startCamera}
            className={`px-4 py-2 text-white transition duration-300 rounded-md ${
              isCameraActive ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-secondary'
            }`}
          >
            {isCameraActive ? 'Stop Camera' : 'Start Camera'}
          </button>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">OR</span>
          </div>
        </div>

        {/* File Upload */}
        <div className="mt-4">
          <label className="px-4 py-2 text-white transition duration-300 rounded-md cursor-pointer bg-primary hover:bg-secondary">
            Upload QR Code Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {isProcessing && (
        <div className="p-4 mt-4 text-center text-gray-600">
          Processing QR code...
        </div>
      )}

      {error && !showErrorModal && (
        <div className="p-4 mt-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 mt-4 text-green-700 bg-green-100 rounded-md">
          Ticket status updated successfully! Redirecting to profile page...
        </div>
      )}

      {scanResult && (
        <div className="w-full max-w-md p-6 mt-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">Ticket Details</h2>
          <div className="space-y-2">
            <p><strong>Title:</strong> {scanResult.title}</p>
            <p><strong>Seats:</strong> {scanResult.seats}</p>
            <p><strong>Genre:</strong> {scanResult.genre}</p>
            <p><strong>Duration:</strong> {scanResult.duration}</p>
            <p><strong>Ticket ID:</strong> {scanResult.ticketId}</p>
          </div>
        </div>
      )}

      {/* Error Modal for Used Tickets */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col items-center">
              <div className="p-3 mb-4 text-red-600 bg-red-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Ticket Already Used</h3>
              <p className="mb-6 text-center text-gray-600">
                This ticket has already been scanned and marked as used. Each ticket can only be used once.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/profile')}
                  className="px-4 py-2 text-white transition duration-300 rounded-md bg-primary hover:bg-secondary"
                >
                  Go to Profile
                </button>
                <button
                  onClick={() => {
                    setShowErrorModal(false);
                    setError(null);
                    setScanResult(null);
                  }}
                  className="px-4 py-2 text-gray-700 transition duration-300 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Scan Another
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Scanner; 