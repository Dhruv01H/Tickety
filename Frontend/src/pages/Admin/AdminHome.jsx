import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function AdminHome() {
  const [timeframe, setTimeframe] = useState("monthly");

  // Data for the donut chart (Best Selling)
  const donutData = [
    { name: "Ticket Sold", value: 45612, color: "#D71A57" },
    { name: "Ticket Left", value: 21512, color: "#2E3640" },
    { name: "Event Held", value: 275, color: "#BE97C6" },
  ];

  // Data for bar chart (New Sales)
  const barData = [
    { name: "Jan", value: 12 },
    { name: "Feb", value: 19 },
    { name: "Mar", value: 15 },
    { name: "Apr", value: 17 },
    { name: "May", value: 16 },
    { name: "Jun", value: 18 },
    { name: "Jul", value: 15 },
    { name: "Aug", value: 20 },
  ];

  // Data for progress chart (Event Held)
  const progressData = [
    { name: "Progress", value: 67, color: "#D71A57" },
    { name: "Remaining", value: 33, color: "#F5F5F5" },
  ];

  // Data for line chart (Increase)
  const lineData = [
    { name: "Jan", value: 20 },
    { name: "Feb", value: 40 },
    { name: "Mar", value: 45 },
    { name: "Apr", value: 35 },
    { name: "May", value: 40 },
    { name: "Jun", value: 35 },
    { name: "Jul", value: 40 },
    { name: "Aug", value: 35 },
    { name: "Sep", value: 45 },
  ];

  // Data for sales revenue chart
  const revenueData = [
    { name: "January", value: 35 },
    { name: "February", value: 40 },
    { name: "March", value: 30 },
    { name: "April", value: 35 },
    { name: "May", value: 32 },
    { name: "June", value: 42 },
    { name: "July", value: 35 },
    { name: "August", value: 32 },
    { name: "September", value: 20 },
    { name: "October", value: 30 },
    { name: "November", value: 45 },
    { name: "December", value: 38 },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between py-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>
          <p className="text-gray-500">Lorem ipsum dolor sit amet</p>
        </div>
        <div className="flex gap-4">
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              className="w-64 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Search here..."
            />
          </div>
          
          <div className="p-3 rounded-lg cursor-pointer bg-primary">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </div>
          <div className="p-3 rounded-lg cursor-pointer bg-dark ">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Card 1: Best Selling */}
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md min-w-64">
          <h2 className="mb-4 text-lg font-semibold">Best Selling</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-4 text-center">
            <div className="flex-1">
              <p className="font-bold text-dark">21512</p>
              <p className="text-sm">Ticket Left</p>
            </div>
            <div className="flex-1">
              <p className="font-bold text-primary">45612</p>
              <p className="text-sm">Ticket Sold</p>
            </div>
            <div className="flex-1">
              <p className="font-bold text-secondary">275</p>
              <p className="text-sm">Event Held</p>
            </div>
          </div>
        </div>

        {/* Card 2: New Sales */}
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md min-w-64">
          <h2 className="mb-2 text-lg font-semibold">New Sales</h2>
          <div className="flex items-center justify-center">
            <p className="text-4xl font-bold text-green-500">93</p>
          </div>
          <div className="h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <Bar dataKey="value" fill="#D71A57" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 3: Event Held */}
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md min-w-64">
          <h2 className="mb-2 text-lg font-semibold">Event Held</h2>
          <div className="flex items-center justify-center">
            <p className="text-4xl font-bold text-green-500">856</p>
          </div>
          <div className="relative flex items-center justify-center h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={progressData}
                  cx="50%"
                  cy="50%"
                  startAngle={90}
                  endAngle={-270}
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-xl font-bold">67%</p>
            </div>
          </div>
        </div>

        {/* Card 4: Increase */}
        <div className="flex-1 p-4 bg-white rounded-lg shadow-md min-w-64">
          <h2 className="mb-2 text-lg font-semibold">Increase 25%</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#D71A57"
                  strokeWidth={2}
                  dot={{ fill: "#FF6B6B", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sales Revenue Chart */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Sales Revenue</h2>
          <div className="flex">
            <button
              className={`px-4 py-1 rounded-lg cursor-pointer ${
                timeframe === "monthly"
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => setTimeframe("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-1 rounded-lg mx-2 cursor-pointer ${
                timeframe === "weekly" ? "bg-primary text-white" : "bg-gray-100"
              }`}
              onClick={() => setTimeframe("weekly")}
            >
              Weekly
            </button>
            <button
              className={`px-4 py-1 rounded-lg cursor-pointer ${
                timeframe === "daily" ? "bg-primary text-white" : "bg-gray-100"
              }`}
              onClick={() => setTimeframe("daily")}
            >
              Daily
            </button>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#AB2E58", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#AB2E58", fontSize: 12 }}
                domain={[0, 60]}
                ticks={[0, 15, 30, 45, 60]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#D71A57"
                strokeWidth={3}
                dot={true}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
