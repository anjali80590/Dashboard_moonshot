import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ data }) {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Categories",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;
