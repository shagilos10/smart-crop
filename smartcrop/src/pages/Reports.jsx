import React from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, ArcElement);

const Reports = () => {
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];
  const production = [200, 220, 250, 240, 210, 230, 280, 300, 350];
  const soilProperty = [7, 7.2, 7.5, 7.7, 7.6, 7.8, 8, 8.2, 8.5];
  const rainfall = [800, 850, 900, 870, 880, 950, 1000, 1100, 1200];
  const pH = [6.5, 6.6, 6.8, 7.0, 7.1, 7.2, 7.3, 7.5, 7.6];
  const potassium = [120, 130, 140, 150, 160, 170, 180, 190, 200];
  const calcium = [300, 320, 340, 350, 360, 370, 380, 390, 400];
  const humidity = [75, 78, 80, 82, 85, 88, 90, 92, 94];
  const nitrogen = [2.5, 3, 3.2, 3.5, 3.8, 4, 4.2, 4.5, 4.7];

  const cropNames = ["Wheat", "Barley", "Rice", "Corn", "Soybeans", "Oats", "Cotton", "Sugarcane", "Potatoes"];

  const productionData = {
    labels: cropNames,
    datasets: [
      {
        label: "Crops Produced (Tons)",
        data: production,
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#8DD1E1", "#D4A017", "#C70039"
        ],
        hoverBackgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#8DD1E1", "#D4A017", "#C70039"
        ],
        borderWidth: 1,
      },
    ],
  };

  const soilPropertyData = {
    labels: years,
    datasets: [
      {
        label: "Soil Property (Score)",
        data: soilProperty,
        fill: false,
        borderColor: "brown",
        tension: 0.1,
      },
    ],
  };

  const rainfallData = {
    labels: years,
    datasets: [
      {
        label: "Rainfall (mm)",
        data: rainfall,
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };

  const pHData = {
    labels: years,
    datasets: [
      {
        label: "Soil pH",
        data: pH,
        fill: false,
        borderColor: "green",
        tension: 0.1,
      },
    ],
  };

  const potassiumData = {
    labels: years,
    datasets: [
      {
        label: "Potassium Levels (mg/kg)",
        data: potassium,
        fill: false,
        borderColor: "orange",
        tension: 0.1,
      },
    ],
  };

  const calciumData = {
    labels: years,
    datasets: [
      {
        label: "Calcium Levels (mg/kg)",
        data: calcium,
        fill: false,
        borderColor: "yellow",
        tension: 0.1,
      },
    ],
  };

  const humidityData = {
    labels: years,
    datasets: [
      {
        label: "Humidity (%)",
        data: humidity,
        fill: false,
        borderColor: "purple",
        tension: 0.1,
      },
    ],
  };

  const nitrogenData = {
    labels: years,
    datasets: [
      {
        label: "Nitrogen Levels (mg/kg)",
        data: nitrogen,
        fill: false,
        borderColor: "red",
        tension: 0.1,
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const cropName = cropNames[tooltipItem.dataIndex];
            const productionAmount = production[tooltipItem.dataIndex];
            return `${cropName}: ${productionAmount} Tons`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6 h-100vh bg-white no-scrollbar overflow-y-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Farmer's Annual Data Visualization
      </h1>

      <div className="grid gap-10 grid-cols-3">
        {/* Pie Chart for production */}
        <div className="rounded-lg backdrop-blur-md shadow-[inset_0_0_calc(10px)_#191d11, _0_0_calc(10px)_#191d11] p-6 mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Crops Produced (Tons) Over the Last 9 Years
          </h2>
          <div className="flex justify-center">
            <div style={{ maxWidth: "300px", maxHeight: "300px" }}>
              <Pie data={productionData} options={pieChartOptions} />
            </div>
          </div>
        </div>

        {/* Bar chart for soil property */}
        <div className="backdrop-blur-md shadow-[inset_0_0_calc(10px)_#191d11, _0_0_calc(10px)_#191d11] rounded-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Soil Property (Score) Over the Last 9 Years
          </h2>
          <div className="flex justify-center">
            <div style={{ maxWidth: "500px", maxHeight: "300px" }}>
              <Bar data={soilPropertyData} />
            </div>
          </div>
        </div>

        {/* Line chart for rainfall */}
        <div className="shadow-lg rounded-lg p-6 mb-10 backdrop-blur-md shadow-[inset_0_0_calc(10px)_#191d11, _0_0_calc(10px)_#191d11]">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Rainfall (mm) Over the Last 9 Years
          </h2>
          <div className="flex justify-center">
            <div style={{ maxWidth: "500px", maxHeight: "300px" }}>
              <Line data={rainfallData} />
            </div>
          </div>
        </div>

        {/* Line chart for pH */}
        <div className="shadow-lg rounded-lg p-6 mb-10 backdrop-blur-md shadow-[inset_0_0_calc(10px)_#191d11, _0_0_calc(10px)_#191d11]">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Soil pH Over the Last 9 Years
          </h2>
          <div className="flex justify-center">
            <div style={{ maxWidth: "500px", maxHeight: "300px" }}>
              <Line data={pHData} />
            </div>
          </div>
        </div>

        {/* Line chart for potassium */}
        <div className="shadow-lg rounded-lg p-6 mb-10 backdrop-blur-md shadow-[inset_0_0_calc(10px)_#191d11, _0_0_calc(10px)_#191d11]">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Potassium Levels (mg/kg) Over the Last 9 Years
          </h2>
          <div className="flex justify-center">
            <div style={{ maxWidth: "500px", maxHeight: "300px" }}>
              <Line data={potassiumData} />
            </div>
          </div>
        </div>

        {/* Line chart for calcium */}
        <div className="shadow-lg rounded-lg p-6 mb-10 backdrop-blur-md shadow-[inset_0_0_calc(10px)_#191d11, _0_0_calc(10px)_#191d11]">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Calcium Levels (mg/kg) Over the Last 9 Years
          </h2>
          <div className="flex justify-center">
            <div style={{ maxWidth: "500px", maxHeight: "300px" }}>
              <Line data={calciumData} />
            </div>
          </div>
        </div>

        {/* Line chart for humidity */}
        <div className="shadow-lg rounded-lg p-6 mb-10 backdrop-blur-md shadow-[inset_0_0_calc(10px)_#191d11, _0_0_calc(10px)_#191d11]">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Humidity (%) Over the Last 9 Years
          </h2>
          <div className="flex justify-center">
            <div style={{ maxWidth: "500px", maxHeight: "300px" }}>
              <Line data={humidityData} />
            </div>
          </div>
        </div>

        {/* Line chart for nitrogen */}
        <div className="shadow-lg rounded-lg p-6 mb-10 backdrop-blur-md shadow-[inset_0_0_calc(10px)_#191d11, _0_0_calc(10px)_#191d11]">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Nitrogen Levels (mg/kg) Over the Last 9 Years
          </h2>
          <div className="flex justify-center">
            <div style={{ maxWidth: "500px", maxHeight: "300px" }}>
              <Line data={nitrogenData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
