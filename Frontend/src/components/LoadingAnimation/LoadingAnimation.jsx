import React from 'react';

function LoadingAnimation() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 z-50">
      <div className="flex flex-col items-center">
        {/* Text Logo */}
        <div className="mb-12 relative">
          <h1 
            className="text-6xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-frost via-primary to-frost"
            style={{
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              textShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
              letterSpacing: '0.2em'
            }}
          >
            TICKETY
          </h1>
          {/* Decorative underline */}
          <div 
            className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-frost to-transparent"
            style={{
              animation: 'slide 2s ease-in-out infinite'
            }}
          ></div>
        </div>
        
        {/* Loading Animation */}
        <div className="relative w-24 h-24">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-gray-800 rounded-full"></div>
          
          {/* Spinning Ring */}
          <div 
            className="absolute inset-0 border-4 border-frost rounded-full border-t-transparent"
            style={{
              animation: 'spin 1s linear infinite'
            }}
          ></div>
          
          {/* Inner Ring */}
          <div 
            className="absolute inset-0 border-4 border-primary rounded-full opacity-75"
            style={{
              animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
            }}
          ></div>
        </div>

        {/* Loading Text */}
        <div className="mt-8 text-center">
          <h3 
            className="text-3xl font-bold text-frost"
            style={{
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          >
            Welcome to Tickety
          </h3>
          <p 
            className="mt-3 text-xl text-gray-400"
            style={{
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              animationDelay: '0.5s'
            }}
          >
            Loading your movie experience...
          </p>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes ping {
            75%, 100% {
              transform: scale(1.2);
              opacity: 0;
            }
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: .7;
            }
          }

          @keyframes slide {
            0%, 100% {
              transform: scaleX(0.5);
              opacity: 0.5;
            }
            50% {
              transform: scaleX(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export default LoadingAnimation; 