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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
          setShowSuccessModal(true);
          
          // Get the user's session to get their wallet address
          const sessionResponse = await axios.get('http://localhost:8080/api/auth/session', {
            withCredentials: true
          });

          if (sessionResponse.data && sessionResponse.data.walletAddress) {
            await axios.get(`http://localhost:8080/api/tickets/seats/${sessionResponse.data.walletAddress}`, {
              withCredentials: true
            });
          }

          // Hide success modal after 5 seconds
          setTimeout(() => {
            setShowSuccessModal(false);
            setScanResult(null);
          }, 5000);
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
        {!isCameraActive && !scanResult && (
          <button
            onClick={startCamera}
            className="w-full px-4 py-2 mb-4 text-white transition-colors duration-200 rounded-md bg-primary hover:bg-pink-600"
          >
            Start Camera
          </button>
        )}

        {isCameraActive && (
          <div className="relative mb-4">
          <video
            ref={videoRef}
              className="w-full rounded-lg"
            autoPlay
            playsInline
          />
          <button
              onClick={stopCamera}
              className="absolute top-2 right-2 p-2 text-white transition-colors duration-200 rounded-full bg-primary hover:bg-pink-600"
          >
              Stop Camera
          </button>
          </div>
        )}

        {/* File Upload */}
        <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            id="file-upload"
            />
          <label
            htmlFor="file-upload"
            className="block w-full px-4 py-2 text-white transition-colors duration-200 rounded-md cursor-pointer bg-primary hover:bg-pink-600"
          >
            Upload QR Code Image
          </label>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 mx-4 text-center bg-white rounded-lg shadow-xl">
              <h3 className="mb-4 text-2xl font-bold text-green-600">Ticket Scanned Successfully!</h3>
              <p className="mb-4 text-gray-700">Enjoy your show!</p>
              <p className="text-sm text-gray-500">This message will close automatically in 5 seconds.</p>
      </div>
        </div>
      )}

        {/* Error Modal */}
        {showErrorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 mx-4 text-center bg-white rounded-lg shadow-xl">
              <h3 className="mb-4 text-2xl font-bold text-red-600">Ticket Already Used</h3>
              <p className="mb-4 text-gray-700">
                This ticket has already been scanned and marked as used. Each ticket can only be used once.
              </p>
              <button
                onClick={() => {
                  setShowErrorModal(false);
                  setScanResult(null);
                }}
                className="px-4 py-2 text-white transition-colors duration-200 rounded-md bg-primary hover:bg-pink-600"
              >
                Scan Another
              </button>
        </div>
        </div>
      )}

        {/* Scan Result */}
        {scanResult && !showSuccessModal && !showErrorModal && (
          <div className="p-4 mt-4 text-left bg-gray-50 rounded-lg">
          <h2 className="mb-4 text-2xl font-semibold">Ticket Details</h2>
            <p><strong>Title:</strong> {scanResult.title}</p>
            <p><strong>Seats:</strong> {scanResult.seats}</p>
            <p><strong>Genre:</strong> {scanResult.genre}</p>
            <p><strong>Duration:</strong> {scanResult.duration}</p>
            <p><strong>Ticket ID:</strong> {scanResult.ticketId}</p>
        </div>
      )}
        </div>
    </div>
  );
}

export default Scanner; 