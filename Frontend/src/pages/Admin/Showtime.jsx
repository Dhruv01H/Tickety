import React from "react";

function Showtime() {
  return (
    <>
      <div className="p-6">
        <h1 className="mb-8 text-4xl font-bold text-primary">Add Showtime</h1>
        <form className="max-w-3xl">
          <div className="mb-6">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="format"
            >
              Event Id
            </label>
            <select
              id="format"
              className="w-full p-4 text-gray-800 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">Event Id</option>
              <option value="2D">1</option>
              <option value="3D">2</option>
              <option value="IMAX">3</option>
              <option value="4DX">4</option>
              <option value="ScreenX">5</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="screen"
            >
              Screen Number
            </label>
            <input
              type="number"
              id="screen"
              placeholder="Enter screen number"
              className="w-full p-4 text-gray-800 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="date"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              className="w-full p-4 text-gray-800 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="time"
            >
              Time
            </label>
            <input
              type="time"
              id="time"
              className="w-full p-4 text-gray-800 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="mb-4">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="price"
            >
              Price (₹)
            </label>
            <input
              type="number"
              id="price"
              placeholder="Enter ticket price"
              className="w-full p-4 text-gray-800 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="mb-6">
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="format"
            >
              Movie Format
            </label>
            <select
              id="format"
              className="w-full p-4 text-gray-800 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">Select format</option>
              <option value="2D">2D</option>
              <option value="3D">3D</option>
              <option value="IMAX">IMAX</option>
              <option value="4DX">4DX</option>
              <option value="ScreenX">ScreenX</option>
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-8 py-3.5 cursor-pointer font-medium text-white transition-colors duration-200 rounded-md bg-primary hover:bg-pink-600 shadow-md"
            >
              Add Showtime
            </button>
            <button
              type="reset"
              className="px-8 py-3.5 font-medium cursor-pointer text-gray-800 transition-colors duration-200 rounded-md bg-gray-200 hover:bg-gray-400"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Showtime;
