import React from 'react';

function ProfileLoading() {
  return (
    <>
      {/* Background Profile Content - Blurred */}
      <div className="opacity-75 blur-[2px] pointer-events-none">
        <div className="px-10 py-6 mt-48 mb-4 sm:px-14 md:px-20 lg:px-28 xl:px-32 2xl:px-40">
          <div className="flex flex-col justify-between gap-5 sm:items-center sm:flex-row">
            <h1 className="text-2xl md:text-4xl animate-pulse bg-gray-300 h-10 w-64 rounded"></h1>
            <div className="w-32 h-10 rounded-lg bg-primary/50 animate-pulse"></div>
          </div>

          <div className="flex flex-col grid-cols-6 gap-10 mt-10 md:grid">
            {/* Left Side */}
            <div className="flex flex-col col-span-2 gap-2 mb-16 border-gray-400 lg:pr-10 lg:border-r-2 md:mb-5">
              <div className="w-48 h-6 mb-3 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-72 h-72 mb-6 bg-gray-300 rounded-lg animate-pulse lg:w-80 lg:h-80"></div>
              <div className="w-full h-12 bg-gray-300 rounded-md animate-pulse"></div>
            </div>

            {/* Right Side - Form Fields */}
            <div className="flex flex-col col-span-4 gap-6">
              <div className="w-48 h-6 mb-1 bg-gray-300 rounded animate-pulse"></div>
              
              {/* Full Name & Username */}
              <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 basis-[50%]">
                  <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
                <div className="flex flex-col gap-2 basis-[50%]">
                  <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
              </div>

              {/* Email & Phone */}
              <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 basis-[50%]">
                  <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
                <div className="flex flex-col gap-2 basis-[50%]">
                  <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
              </div>

              {/* DOB & Gender */}
              <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 basis-[50%]">
                  <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
                <div className="flex flex-col gap-2 basis-[50%]">
                  <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
              </div>

              {/* State & District */}
              <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 basis-[50%]">
                  <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
                <div className="flex flex-col gap-2 basis-[50%]">
                  <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-full h-10 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2">
                <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-full h-24 bg-gray-300 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-lg">
          {/* Profile Icon Animation */}
          <div className="relative w-24 h-24 mb-8">
            {/* Profile Circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20"></div>
            
            {/* Animated Border */}
            <div 
              className="absolute inset-0 rounded-full border-4 border-primary"
              style={{
                animation: 'rotate 2s linear infinite'
              }}
            ></div>
            
            {/* Profile Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-primary animate-pulse" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
            </div>
          </div>

          {/* Loading Text */}
          <div className="text-center">
            <h3 
              className="text-2xl font-bold text-gray-800 mb-2"
              style={{
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            >
              Loading Profile
            </h3>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary" style={{ animation: 'bounce 1s infinite 0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-primary" style={{ animation: 'bounce 1s infinite 0.4s' }}></div>
              <div className="w-2 h-2 rounded-full bg-primary" style={{ animation: 'bounce 1s infinite 0.6s' }}></div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
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

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-4px);
            }
          }
        `}
      </style>
    </>
  );
}

export default ProfileLoading; 