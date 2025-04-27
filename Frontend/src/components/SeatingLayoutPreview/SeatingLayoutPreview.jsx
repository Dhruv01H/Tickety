import React from 'react';

const SeatingLayoutPreview = ({ capacity }) => {
  // Calculate rows and seats per row based on capacity
  const calculateLayout = (totalCapacity) => {
    // Assuming a standard theater layout with more seats in the middle rows
    const rows = Math.ceil(Math.sqrt(totalCapacity / 1.5)); // 1.5 is the aspect ratio
    const seatsPerRow = Math.ceil(totalCapacity / rows);
    
    return {
      rows,
      seatsPerRow,
      totalCapacity
    };
  };

  const layout = calculateLayout(parseInt(capacity) || 0);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Seating Layout Preview</h3>
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="text-center mb-4">
          <div className="inline-block px-4 py-2 bg-gray-300 rounded-lg">
            Screen
          </div>
        </div>
        <div className="space-y-2">
          {Array.from({ length: layout.rows }, (_, rowIndex) => (
            <div key={rowIndex} className="flex justify-center space-x-1">
              <span className="w-6 text-sm font-medium text-gray-600">
                {String.fromCharCode(65 + rowIndex)}
              </span>
              <div className="flex space-x-1">
                {Array.from({ length: layout.seatsPerRow }, (_, seatIndex) => (
                  <div
                    key={seatIndex}
                    className="w-6 h-6 flex items-center justify-center bg-green-100 border border-green-200 rounded-sm text-xs"
                  >
                    {seatIndex + 1}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>Total Rows: {layout.rows}</p>
          <p>Seats per Row: {layout.seatsPerRow}</p>
          <p>Total Capacity: {layout.totalCapacity}</p>
        </div>
      </div>
    </div>
  );
};

export default SeatingLayoutPreview; 