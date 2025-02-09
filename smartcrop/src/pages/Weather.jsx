import React, { useState, useEffect } from "react";
import { WiDaySunny, WiRain, WiThermometer } from "react-icons/wi";

const weatherData = [
  { month: "Jan", sun: 8, rain: 5, temp: 15 },
  { month: "Feb", sun: 7, rain: 6, temp: 16 },
  { month: "Mar", sun: 9, rain: 7, temp: 18 },
  { month: "Apr", sun: 10, rain: 8, temp: 20 },
  { month: "May", sun: 11, rain: 6, temp: 23 },
  { month: "Jun", sun: 12, rain: 5, temp: 26 },
  { month: "Jul", sun: 10, rain: 9, temp: 27 },
  { month: "Aug", sun: 9, rain: 10, temp: 26 },
  { month: "Sep", sun: 8, rain: 7, temp: 24 },
  { month: "Oct", sun: 9, rain: 5, temp: 22 },
  { month: "Nov", sun: 7, rain: 6, temp: 18 },
  { month: "Dec", sun: 6, rain: 7, temp: 16 },
];

const getCurrentMonthData = () => {
  const currentMonth = new Date().toLocaleString("default", { month: "short" });
  return weatherData.find((data) => data.month === currentMonth) || {};
};

const getCurrentPlant = () => {
  const currentMonth = new Date().toLocaleString("default", { month: "short" });
  switch (currentMonth) {
    case "Jan":
    case "Feb":
    case "Mar":
      return "Winter Plant";
    case "Apr":
    case "May":
    case "Jun":
      return "Spring Plant";
    case "Jul":
    case "Aug":
    case "Sep":
      return "Summer Plant";
    default:
      return "Autumn Plant";
  }
};

const WeatherComponent = () => {
  const todayWeather = getCurrentMonthData();
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const currentPlant = getCurrentPlant();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-10 bg-white h-screen overflow-y-auto mx-auto shadow-lg rounded-lg ">
      <h2 className="text-2xl font-bold text-center mb-4">Today's Weather</h2>
      <div className="p-4 bg-green-100 rounded-lg grid grid-cols-2 shadow-md text-center">
        <div>
        <h3 className="text-xl font-semibold">{todayWeather.month}</h3>
        <div className="flex justify-center items-center gap-2 mt-2 text-yellow-500">
          <WiDaySunny size={30} /> {todayWeather.sun} hrs
        </div>
        <div className="flex justify-center items-center gap-2 mt-2 text-blue-500">
          <WiRain size={30} /> {todayWeather.rain} days
        </div>
        <div className="flex justify-center items-center gap-2 mt-2 text-red-500">
          <WiThermometer size={30} /> {todayWeather.temp}°C
        </div>
        </div>
        <div className="mt-6 p-4 bg-green-500 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-semibold text-white">Current Time: {currentTime}</h3>
        <h3 className="text-lg font-semibold mt-2 text-white">Current Plant: {currentPlant}</h3>
      </div>
      </div>

      <h2 className="text-2xl font-bold text-center mt-6 mb-4">Monthly Weather Overview</h2>
      <div className="grid grid-cols-4 gap-4 text-center">
        {weatherData.map((data, index) => (
          <div
            key={index}
            className="p-4 bg-gray-100 rounded-lg shadow-md max-w-52 hover:bg-gray-200 transition border border-green-500"
          >
            <h3 className="text-lg font-semibold">{data.month}</h3>
            <div className="flex justify-center items-center gap-2 mt-2 text-yellow-500">
              <WiDaySunny size={24} /> {data.sun} hrs
            </div>
            <div className="flex justify-center items-center gap-2 mt-2 text-blue-500">
              <WiRain size={24} /> {data.rain} days
            </div>
            <div className="flex justify-center items-center gap-2 mt-2 text-red-500">
              <WiThermometer size={24} /> {data.temp}°C
            </div>
          </div>
        ))}
      </div>

      {/* Clock and Plant Information */}
      
    </div>
  );
};

export default WeatherComponent;
