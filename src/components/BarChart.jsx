// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// // Register chart components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // function BarChart({ ageRange, dateRange }) {
// //   const data = {
// //     labels: ["Feature A", "Feature B", "Feature C"], // Categories on the X-axis
// //     datasets: [
// //       {
// //         label: "Total Time Spent",
// //         data: [12, 19, 3], // Dummy data
// //         backgroundColor: "rgba(75,192,192,0.6)",
// //       },
// //     ],
// //   };

// //   return (
// //     <div className="bg-white p-4 shadow rounded">
// //       <Bar data={data} />
// //     </div>
// //   );
// // }

// // export default BarChart;

// function BarChart({ ageRange, dateRange }) {
//   const data = {
//     labels: ["Feature A", "Feature B", "Feature C"], // Example data
//     datasets: [
//       {
//         label: "Total Time Spent",
//         data: [12, 19, 3], // Dummy data
//         backgroundColor: "rgba(75,192,192,0.6)",
//       },
//     ],
//   };

//   const options = {
//     maintainAspectRatio: false, // Disable the aspect ratio to manually control size
//     responsive: true,
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div style={{ width: "100%", height: "200px" }}>
//       <Bar data={data} options={options} />
//     </div>
//   );
// }

// export default BarCha









import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Explicitly register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ data }) {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        type: "category", // Explicitly set the X-axis to use category scale
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
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
