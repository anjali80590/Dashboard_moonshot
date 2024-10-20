// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// // Register chart components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // function LineChart({ ageRange, dateRange }) {
// //   const data = {
// //     labels: ["January", "February", "March"], // Categories on the X-axis
// //     datasets: [
// //       {
// //         label: "Category Trend",
// //         data: [33, 53, 85], // Dummy data
// //         fill: false,
// //         borderColor: "rgba(75,192,192,1)",
// //       },
// //     ],
// //   };

// //   return (
// //     <div className="bg-white p-4 shadow rounded">
// //       <Line data={data} />
// //     </div>
// //   );
// // }


// function LineChart({ ageRange, dateRange }) {
//   const data = {
//     labels: ["January", "February", "March"], // Example data
//     datasets: [
//       {
//         label: "Category Trend",
//         data: [33, 53, 85], // Dummy data
//         fill: false,
//         borderColor: "rgba(75,192,192,1)",
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
//       <Line data={data} options={options} />
//     </div>
//   );
// }

// export default LineChart;













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

// Explicitly register the required components
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
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;
