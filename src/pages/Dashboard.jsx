





// // Dashboard.js
// import React, { useState, useEffect } from "react";
// import { Bar, Line } from "react-chartjs-2";
// import Papa from "papaparse";
// import Filters from "../components/Filters"; // Ensure this component exists
// import Cookies from "js-cookie"; // Import js-cookie for cookie management
// import { format } from "date-fns"; // Import date formatting function
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   Zoom,
// } from "chart.js";
// import zoomPlugin from "chartjs-plugin-zoom";

// // Register all required components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   zoomPlugin
// );

// function Dashboard() {
//   const [barChartData, setBarChartData] = useState(() => {
//     const cookieData = Cookies.get("barChartData");
//     return cookieData ? JSON.parse(cookieData) : null;
//   });

//   const [lineChartData, setLineChartData] = useState(() => {
//     const cookieData = Cookies.get("lineChartData");
//     return cookieData ? JSON.parse(cookieData) : null;
//   });

//   const [selectedFeature, setSelectedFeature] = useState(null);

//   // Filters State
//   const [ageFilter, setAgeFilter] = useState(Cookies.get("ageFilter") || "15-25");
//   const [genderFilter, setGenderFilter] = useState(Cookies.get("genderFilter") || "Male");
//   const [startDate, setStartDate] = useState(new Date(Cookies.get("startDate")) || new Date("2022-01-01"));
//   const [endDate, setEndDate] = useState(new Date(Cookies.get("endDate")) || new Date("2022-12-31"));

//   // Google Sheets CSV Link
//   const csvFile = "https://docs.google.com/spreadsheets/d/1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0/gviz/tq?tqx=out:csv";

//   // Helper function to parse date from CSV
//   const parseDate = (dateString) => {
//     const parts = dateString.split("/");
//     return new Date(parts[2], parts[0] - 1, parts[1]); // Parse as MM/DD/YYYY
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       Papa.parse(csvFile, {
//         download: true,
//         header: true,
//         complete: (results) => {
//           const rows = results.data;

//           const features = ["A", "B", "C", "D", "E", "F"];
//           const totalTimeSpent = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
//           const dailyData = {};

//           rows.forEach((row) => {
//             const rowDate = parseDate(row["Day"]);

//             if (
//               row["Age"] === ageFilter &&
//               row["Gender"] === genderFilter &&
//               rowDate >= startDate &&
//               rowDate <= endDate
//             ) {
//               const day = row["Day"];
//               if (!dailyData[day]) {
//                 dailyData[day] = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
//               }

//               features.forEach((feature) => {
//                 totalTimeSpent[feature] += parseInt(row[feature]);
//                 dailyData[day][feature] += parseInt(row[feature]);
//               });
//             }
//           });

//           const reversedFeatures = features.reverse();
//           const barData = reversedFeatures.map((feature) => totalTimeSpent[feature]);
//           const barColors = reversedFeatures.map((feature) =>
//             feature === "E" ? "red" : "darkblue"
//           );

//           const newBarChartData = {
//             labels: reversedFeatures,
//             datasets: [{
//               label: "Total Time Spent",
//               data: barData,
//               backgroundColor: barColors,
//             }],
//           };

//           setBarChartData(newBarChartData);
//           Cookies.set("barChartData", JSON.stringify(newBarChartData), { expires: 7 }); // Store in cookies for 7 days

//           // Prepare line chart data for selected feature
//           const prepareLineChartData = (feature) => {
//             const days = Object.keys(dailyData);
//             const formattedDays = days.map((day) =>
//               format(parseDate(day), "dd MMM")
//             );
//             const lineData = days.map((day) => dailyData[day][feature]);

//             const newLineChartData = {
//               labels: formattedDays,
//               datasets: [{
//                 label: `Trend for ${feature}`,
//                 data: lineData,
//                 fill: false,
//                 borderColor: "darkblue",
//                 pointBackgroundColor: "darkblue",
//                 pointRadius: 4,
//                 pointHoverRadius: 6,
//               }],
//             };

//             setLineChartData(newLineChartData);
//             Cookies.set("lineChartData", JSON.stringify(newLineChartData), { expires: 7 }); // Store in cookies for 7 days
//           };

//           if (selectedFeature) {
//             prepareLineChartData(selectedFeature);
//           }
//         },
//       });
//     };

//     fetchData();
//   }, [ageFilter, genderFilter, startDate, endDate, selectedFeature]);

//   const handleBarClick = (elements) => {
//     if (elements.length > 0) {
//       const featureIndex = elements[0].index;
//       const feature = barChartData.labels[featureIndex];
//       setSelectedFeature(feature);
//       console.log("Selected feature:", feature); // Log the selected feature
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "80px",
//         backgroundColor: "#f7fafc",
//         minHeight: "100vh",
//       }}
//     >
//       <div style={{ display: "flex", alignItems:"center", justifyContent: "space-between" }}>
//         {/* Filters */}
//         <div style={{ width: "300px" }}>
//           <Filters
//             ageFilter={ageFilter}
//             setAgeFilter={setAgeFilter}
//             genderFilter={genderFilter}
//             setGenderFilter={setGenderFilter}
//             startDate={startDate}
//             setStartDate={setStartDate}
//             endDate={endDate}
//             setEndDate={setEndDate}
//           />
//         </div>

//         {/* Horizontal Bar Chart */}
//         <div style={{ width: "450px", height: "400px" }}>
//           <h3 style={{ textAlign: "center" }}>Horizontal Bar Chart - Total Time Spent</h3>
//           {barChartData && (
//             <Bar
//               data={barChartData}
//               options={{
//                 maintainAspectRatio: false,
//                 indexAxis: "y",
//                 onClick: (event, elements) => handleBarClick(elements),
//               }}
//             />
//           )}
//         </div>

//         {/* Line Chart */}
//         <div style={{ width: "450px", height: "400px" }}>
//           <h3 style={{ textAlign: "center" }}>Line Chart - Time Trend for {selectedFeature || "Feature"}</h3>
//           {lineChartData && (
//             <Line
//               data={lineChartData}
//               options={{
//                 maintainAspectRatio: false,
//                 scales: {
//                   x: {
//                     title: {
//                       display: true,
//                       text: "Date",
//                     },
//                   },
//                   y: {
//                     beginAtZero: true,
//                     title: {
//                       display: true,
//                       text: "Time Spent",
//                     },
//                   },
//                 },
//                 plugins: {
//                   zoom: {
//                     pan: {
//                       enabled: true,
//                       mode: "x",
//                     },
//                     zoom: {
//                       enabled: true,
//                       mode: "x",
//                     },
//                   },
//                 },
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;








// import React, { useState, useEffect } from "react";
// import { Bar, Line } from "react-chartjs-2";
// import Papa from "papaparse";
// import Filters from "../components/Filters";
// import Cookies from "js-cookie";
// import { format } from "date-fns";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   Zoom,
// } from "chart.js";
// import zoomPlugin from "chartjs-plugin-zoom";

// // Register chart components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   zoomPlugin
// );

// function Dashboard() {
//   // State for Bar Chart Data, Line Chart Data, and Selected Feature
//   const [barChartData, setBarChartData] = useState(() => {
//     const cookieData = Cookies.get("barChartData");
//     return cookieData ? JSON.parse(cookieData) : null;
//   });

//   const [lineChartData, setLineChartData] = useState(() => {
//     const cookieData = Cookies.get("lineChartData");
//     return cookieData ? JSON.parse(cookieData) : null;
//   });

//   const [selectedFeature, setSelectedFeature] = useState(
//     Cookies.get("selectedFeature") || null
//   );

//   // Filters State (Loaded from Cookies)
//   const [ageFilter, setAgeFilter] = useState(
//     Cookies.get("ageFilter") || "15-25"
//   );
//   const [genderFilter, setGenderFilter] = useState(
//     Cookies.get("genderFilter") || "Male"
//   );
//   const [startDate, setStartDate] = useState(() => {
//     const date = Cookies.get("startDate");
//     return date ? new Date(date) : new Date("2022-01-01");
//   });
//   const [endDate, setEndDate] = useState(() => {
//     const date = Cookies.get("endDate");
//     return date ? new Date(date) : new Date("2022-12-31");
//   });

//   // Google Sheets CSV Link
//   const csvFile =
//     "https://docs.google.com/spreadsheets/d/1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0/gviz/tq?tqx=out:csv";

//   // Helper function to parse date from CSV
//   const parseDate = (dateString) => {
//     const parts = dateString.split("/");
//     return new Date(parts[2], parts[0] - 1, parts[1]); // Parse as MM/DD/YYYY
//   };

//   // Reset preferences and clear cookies
//   const handleResetPreferences = () => {
//     Cookies.remove("ageFilter");
//     Cookies.remove("genderFilter");
//     Cookies.remove("startDate");
//     Cookies.remove("endDate");
//     Cookies.remove("barChartData");
//     Cookies.remove("lineChartData");
//     Cookies.remove("selectedFeature");

//     setAgeFilter("15-25");
//     setGenderFilter("Male");
//     setStartDate(new Date("2022-01-01"));
//     setEndDate(new Date("2022-12-31"));
//     setSelectedFeature(null);
//   };

//   // Fetch and update chart data based on filters and store data in cookies
//   useEffect(() => {
//     const fetchData = async () => {
//       Papa.parse(csvFile, {
//         download: true,
//         header: true,
//         complete: (results) => {
//           const rows = results.data;

//           const features = ["A", "B", "C", "D", "E", "F"];
//           const totalTimeSpent = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
//           const dailyData = {};

//           rows.forEach((row) => {
//             const rowDate = parseDate(row["Day"]);

//             if (
//               row["Age"] === ageFilter &&
//               row["Gender"] === genderFilter &&
//               rowDate >= startDate &&
//               rowDate <= endDate
//             ) {
//               const day = row["Day"];
//               if (!dailyData[day]) {
//                 dailyData[day] = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
//               }

//               features.forEach((feature) => {
//                 totalTimeSpent[feature] += parseInt(row[feature], 10);
//                 dailyData[day][feature] += parseInt(row[feature], 10);
//               });
//             }
//           });

//           const reversedFeatures = features.reverse();
//           const barData = reversedFeatures.map(
//             (feature) => totalTimeSpent[feature]
//           );
//           const barColors = reversedFeatures.map((feature) =>
//             feature === "E" ? "red" : "darkblue"
//           );

//           const newBarChartData = {
//             labels: reversedFeatures,
//             datasets: [
//               {
//                 label: "Total Time Spent",
//                 data: barData,
//                 backgroundColor: barColors,
//               },
//             ],
//           };

//           setBarChartData(newBarChartData);
//           Cookies.set("barChartData", JSON.stringify(newBarChartData), {
//             expires: 7,
//           }); // Save in cookies

//           const prepareLineChartData = (feature) => {
//             const days = Object.keys(dailyData);
//             const formattedDays = days.map((day) =>
//               format(parseDate(day), "dd MMM")
//             );
//             const lineData = days.map((day) => dailyData[day][feature]);

//             const newLineChartData = {
//               labels: formattedDays,
//               datasets: [
//                 {
//                   label: `Trend for ${feature}`,
//                   data: lineData,
//                   fill: false,
//                   borderColor: "darkblue",
//                   pointBackgroundColor: "darkblue",
//                   pointRadius: 4,
//                   pointHoverRadius: 6,
//                 },
//               ],
//             };

//             setLineChartData(newLineChartData);
//             Cookies.set("lineChartData", JSON.stringify(newLineChartData), {
//               expires: 7,
//             });
//           };

//           if (selectedFeature) {
//             prepareLineChartData(selectedFeature);
//           }
//         },
//       });
//     };

//     fetchData();

//     // Store filters in cookies when they change
//     Cookies.set("ageFilter", ageFilter, { expires: 7 });
//     Cookies.set("genderFilter", genderFilter, { expires: 7 });
//     Cookies.set("startDate", startDate.toISOString(), { expires: 7 });
//     Cookies.set("endDate", endDate.toISOString(), { expires: 7 });
//     Cookies.set("selectedFeature", selectedFeature, { expires: 7 });
//   }, [ageFilter, genderFilter, startDate, endDate, selectedFeature]);

//   // Handle bar chart click to set selected feature
//   const handleBarClick = (elements) => {
//     if (elements.length > 0) {
//       const featureIndex = elements[0].index;
//       const feature = barChartData.labels[featureIndex];
//       setSelectedFeature(feature);
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "60px",
//         backgroundColor: "#f7fafc",
//         minHeight: "100vh",
//       }} 
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "20px",
//         }}
//       >
//         <Filters
//           ageFilter={ageFilter}
//           setAgeFilter={setAgeFilter}
//           genderFilter={genderFilter}
//           setGenderFilter={setGenderFilter}
//           startDate={startDate}
//           setStartDate={setStartDate}
//           endDate={endDate}
//           setEndDate={setEndDate}
//         />
//         <button
//           onClick={handleResetPreferences}
//           style={{
//             padding: "10px",
//             backgroundColor: "gray",
//             color: "white",
//             borderRadius: "5px",
//           }}
//         >
//           Reset Preferences
//         </button>
//       </div>
//       <div style={{ display: "flex", marginTop:"60px", justifyContent: "space-between" }}>
//         <div style={{ width: "450px", height: "300px" }}>
//           <h3 style={{ textAlign: "center" }}>
//             Horizontal Bar Chart - Total Time Spent
//           </h3>
//           {barChartData && (
//             <Bar
//               data={barChartData}
//               options={{
//                 maintainAspectRatio: false,
//                 indexAxis: "y",
//                 onClick: (event, elements) => handleBarClick(elements),
//               }}
//             />
//           )}
//         </div>
//         <div style={{ width: "450px", height: "300px" }}>
//           <h3 style={{ textAlign: "center" }}>
//             Line Chart - Time Trend for {selectedFeature || "Feature"}
//           </h3>
//           {lineChartData && (
//             <Line
//               data={lineChartData}
//               options={{
//                 maintainAspectRatio: false,
//                 scales: {
//                   x: {
//                     title: {
//                       display: true,
//                       text: "Date",
//                     },
//                   },
//                   y: {
//                     beginAtZero: true,
//                     title: {
//                       display: true,
//                       text: "Time Spent",
//                     },
//                   },
//                 },
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;





// import React, { useState, useEffect } from "react";
// import { Bar, Line } from "react-chartjs-2";
// import Papa from "papaparse";
// import Filters from "../components/Filters";
// import Cookies from "js-cookie";
// import { format } from "date-fns";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   Zoom,
// } from "chart.js";
// import zoomPlugin from "chartjs-plugin-zoom";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
//   zoomPlugin
// );

// function Dashboard() {
//   const [barChartData, setBarChartData] = useState(() => {
//     const cookieData = Cookies.get("barChartData");
//     return cookieData ? JSON.parse(cookieData) : null;
//   });

//   const [lineChartData, setLineChartData] = useState(() => {
//     const cookieData = Cookies.get("lineChartData");
//     return cookieData ? JSON.parse(cookieData) : null;
//   });

//   const [selectedFeature, setSelectedFeature] = useState(
//     Cookies.get("selectedFeature") || null
//   );

//   const [ageFilter, setAgeFilter] = useState(
//     Cookies.get("ageFilter") || "15-25"
//   );
//   const [genderFilter, setGenderFilter] = useState(
//     Cookies.get("genderFilter") || "Male"
//   );
//   const [startDate, setStartDate] = useState(() => {
//     const date = Cookies.get("startDate");
//     return date ? new Date(date) : new Date("2022-01-01");
//   });
//   const [endDate, setEndDate] = useState(() => {
//     const date = Cookies.get("endDate");
//     return date ? new Date(date) : new Date("2022-12-31");
//   });

//   const csvFile =
//     "https://docs.google.com/spreadsheets/d/1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0/gviz/tq?tqx=out:csv";

//   const parseDate = (dateString) => {
//     const parts = dateString.split("/");
//     return new Date(parts[2], parts[0] - 1, parts[1]);
//   };

//   const handleResetPreferences = () => {
//     Cookies.remove("ageFilter");
//     Cookies.remove("genderFilter");
//     Cookies.remove("startDate");
//     Cookies.remove("endDate");
//     Cookies.remove("barChartData");
//     Cookies.remove("lineChartData");
//     Cookies.remove("selectedFeature");

//     setAgeFilter("15-25");
//     setGenderFilter("Male");
//     setStartDate(new Date("2022-01-01"));
//     setEndDate(new Date("2022-12-31"));
//     setSelectedFeature(null);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       Papa.parse(csvFile, {
//         download: true,
//         header: true,
//         complete: (results) => {
//           const rows = results.data;

//           const features = ["A", "B", "C", "D", "E", "F"];
//           const totalTimeSpent = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
//           const dailyData = {};

//           rows.forEach((row) => {
//             const rowDate = parseDate(row["Day"]);

//             if (
//               row["Age"] === ageFilter &&
//               row["Gender"] === genderFilter &&
//               rowDate >= startDate &&
//               rowDate <= endDate
//             ) {
//               const day = row["Day"];
//               if (!dailyData[day]) {
//                 dailyData[day] = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
//               }

//               features.forEach((feature) => {
//                 totalTimeSpent[feature] += parseInt(row[feature], 10);
//                 dailyData[day][feature] += parseInt(row[feature], 10);
//               });
//             }
//           });

//           const reversedFeatures = features.reverse();
//           const barData = reversedFeatures.map(
//             (feature) => totalTimeSpent[feature]
//           );
//           const barColors = reversedFeatures.map((feature) =>
//             feature === "E" ? "red" : "darkblue"
//           );

//           const newBarChartData = {
//             labels: reversedFeatures,
//             datasets: [
//               {
//                 label: "Total Time Spent",
//                 data: barData,
//                 backgroundColor: barColors,
//               },
//             ],
//           };

//           setBarChartData(newBarChartData);
//           Cookies.set("barChartData", JSON.stringify(newBarChartData), {
//             expires: 7,
//           });

//           const prepareLineChartData = (feature) => {
//             const days = Object.keys(dailyData);
//             const formattedDays = days.map((day) =>
//               format(parseDate(day), "dd MMM")
//             );
//             const lineData = days.map((day) => dailyData[day][feature]);

//             const newLineChartData = {
//               labels: formattedDays,
//               datasets: [
//                 {
//                   label: `Trend for ${feature}`,
//                   data: lineData,
//                   fill: false,
//                   borderColor: "darkblue",
//                   pointBackgroundColor: "darkblue",
//                   pointRadius: 4,
//                   pointHoverRadius: 6,
//                 },
//               ],
//             };

//             setLineChartData(newLineChartData);
//             Cookies.set("lineChartData", JSON.stringify(newLineChartData), {
//               expires: 7,
//             });
//           };

//           if (selectedFeature) {
//             prepareLineChartData(selectedFeature);
//           }
//         },
//       });
//     };

//     fetchData();

//     Cookies.set("ageFilter", ageFilter, { expires: 7 });
//     Cookies.set("genderFilter", genderFilter, { expires: 7 });
//     Cookies.set("startDate", startDate.toISOString(), { expires: 7 });
//     Cookies.set("endDate", endDate.toISOString(), { expires: 7 });
//     Cookies.set("selectedFeature", selectedFeature, { expires: 7 });
//   }, [ageFilter, genderFilter, startDate, endDate, selectedFeature]);

//   const handleBarClick = (elements) => {
//     if (elements.length > 0) {
//       const featureIndex = elements[0].index;
//       const feature = barChartData.labels[featureIndex];
//       setSelectedFeature(feature);
//     }
//   };

//   return (
//     <div
//       style={{
//         padding: "60px",
//         paddingTop:"5px",
//         backgroundColor: "#f7fafc",
//         Height: "100vh",
//         overflow:"auto",
//       }}
//     >
//       {/* Add the centered Dashboard title */}
//       <h2 style={{ textAlign: "center", }}>
//         Dashboard Page
//       </h2>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexWrap: "wrap",
//           marginBottom: "20px",
//         }}
//       >
//         <Filters
//           ageFilter={ageFilter}
//           setAgeFilter={setAgeFilter}
//           genderFilter={genderFilter}
//           setGenderFilter={setGenderFilter}
//           startDate={startDate}
//           setStartDate={setStartDate}
//           endDate={endDate}
//           setEndDate={setEndDate}
//         />
//         <button
//           onClick={handleResetPreferences}
//           style={{
//             padding: "10px",
//             backgroundColor: "gray",
//             color: "white",
//             borderRadius: "5px",
//             marginTop: "10px", // Added for better alignment
//           }}
//         >
//           Reset Preferences
//         </button>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "space-around", // Ensure charts don't overlap
//           marginTop: "20px", // Added margin to avoid overlap
//         }}
//       >
//         <div
//           style={{
//             width: "100%",
//             marginTop: "80px",
//             maxWidth: "600px",
//             height: "300px",
//           }}
//         >
//           <h3 style={{ textAlign: "center" }}>
//             Horizontal Bar Chart - Total Time Spent
//           </h3>
//           {barChartData && (
//             <Bar
//               data={barChartData}
//               options={{
//                 maintainAspectRatio: false,
//                 indexAxis: "y",
//                 onClick: (event, elements) => handleBarClick(elements),
//               }}
//             />
//           )}
//         </div>
//         <div
//           style={{
//             width: "100%",
//             marginTop: "80px",
//             maxWidth: "600px",
//             height: "300px",
//           }}
//         >
//           <h3 style={{ textAlign: "center" }}>
//             Line Chart - Time Trend for {selectedFeature || "Feature"}
//           </h3>
//           {lineChartData && (
//             <Line
//               data={lineChartData}
//               options={{
//                 maintainAspectRatio: false,
//                 scales: {
//                   x: {
//                     title: {
//                       display: true,
//                       text: "Date",
//                     },
//                   },
//                   y: {
//                     beginAtZero: true,
//                     title: {
//                       display: true,
//                       text: "Time Spent",
//                     },
//                   },
//                 },
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;






import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import Papa from "papaparse";
import Filters from "../components/Filters";
import Cookies from "js-cookie";
import { format } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Zoom,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

function Dashboard() {
  const [barChartData, setBarChartData] = useState(() => {
    const cookieData = Cookies.get("barChartData");
    return cookieData ? JSON.parse(cookieData) : null;
  });

  const [lineChartData, setLineChartData] = useState(() => {
    const cookieData = Cookies.get("lineChartData");
    return cookieData ? JSON.parse(cookieData) : null;
  });

  const [selectedFeature, setSelectedFeature] = useState(
    Cookies.get("selectedFeature") || null
  );

  const [ageFilter, setAgeFilter] = useState(
    Cookies.get("ageFilter") || "15-25"
  );
  const [genderFilter, setGenderFilter] = useState(
    Cookies.get("genderFilter") || "Male"
  );
  const [startDate, setStartDate] = useState(() => {
    const date = Cookies.get("startDate");
    return date ? new Date(date) : new Date("2022-01-01");
  });
  const [endDate, setEndDate] = useState(() => {
    const date = Cookies.get("endDate");
    return date ? new Date(date) : new Date("2022-12-31");
  });

  const csvFile =
    "https://docs.google.com/spreadsheets/d/1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0/gviz/tq?tqx=out:csv";

  const parseDate = (dateString) => {
    const parts = dateString.split("/");
    return new Date(parts[2], parts[0] - 1, parts[1]);
  };

  const handleResetPreferences = () => {
    Cookies.remove("ageFilter");
    Cookies.remove("genderFilter");
    Cookies.remove("startDate");
    Cookies.remove("endDate");
    Cookies.remove("barChartData");
    Cookies.remove("lineChartData");
    Cookies.remove("selectedFeature");

    setAgeFilter("15-25");
    setGenderFilter("Male");
    setStartDate(new Date("2022-01-01"));
    setEndDate(new Date("2022-12-31"));
    setSelectedFeature(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      Papa.parse(csvFile, {
        download: true,
        header: true,
        complete: (results) => {
          const rows = results.data;

          const features = ["A", "B", "C", "D", "E", "F"];
          const totalTimeSpent = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
          const dailyData = {};

          rows.forEach((row) => {
            const rowDate = parseDate(row["Day"]);

            if (
              row["Age"] === ageFilter &&
              row["Gender"] === genderFilter &&
              rowDate >= startDate &&
              rowDate <= endDate
            ) {
              const day = row["Day"];
              if (!dailyData[day]) {
                dailyData[day] = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
              }

              features.forEach((feature) => {
                totalTimeSpent[feature] += parseInt(row[feature], 10);
                dailyData[day][feature] += parseInt(row[feature], 10);
              });
            }
          });

          const reversedFeatures = features.reverse();
          const barData = reversedFeatures.map(
            (feature) => totalTimeSpent[feature]
          );
          const barColors = reversedFeatures.map((feature) =>
            feature === "E" ? "red" : "darkblue"
          );

          const newBarChartData = {
            labels: reversedFeatures,
            datasets: [
              {
                label: "Total Time Spent",
                data: barData,
                backgroundColor: barColors,
              },
            ],
          };

          setBarChartData(newBarChartData);
          Cookies.set("barChartData", JSON.stringify(newBarChartData), {
            expires: 7,
          });

          const prepareLineChartData = (feature) => {
            const days = Object.keys(dailyData);
            const formattedDays = days.map((day) =>
              format(parseDate(day), "dd MMM")
            );
            const lineData = days.map((day) => dailyData[day][feature]);

            const newLineChartData = {
              labels: formattedDays,
              datasets: [
                {
                  label: `Trend for ${feature}`,
                  data: lineData,
                  fill: false,
                  borderColor: "darkblue",
                  pointBackgroundColor: "darkblue",
                  pointRadius: 4,
                  pointHoverRadius: 6,
                },
              ],
            };

            setLineChartData(newLineChartData);
            Cookies.set("lineChartData", JSON.stringify(newLineChartData), {
              expires: 7,
            });
          };

          if (selectedFeature) {
            prepareLineChartData(selectedFeature);
          }
        },
      });
    };

    fetchData();

    Cookies.set("ageFilter", ageFilter, { expires: 7 });
    Cookies.set("genderFilter", genderFilter, { expires: 7 });
    Cookies.set("startDate", startDate.toISOString(), { expires: 7 });
    Cookies.set("endDate", endDate.toISOString(), { expires: 7 });
    Cookies.set("selectedFeature", selectedFeature, { expires: 7 });
  }, [ageFilter, genderFilter, startDate, endDate, selectedFeature]);

  const handleBarClick = (elements) => {
    if (elements.length > 0) {
      const featureIndex = elements[0].index;
      const feature = barChartData.labels[featureIndex];
      setSelectedFeature(feature);
    }
  };

  return (
    <div
      style={{
        padding: "60px",
        paddingTop: "5px",
        backgroundColor: "#f7fafc",
        Height: "100vh",
        overflow: "auto",
      }}
    >
      {/* Add the centered Dashboard title */}
      <h2 style={{ textAlign: "center" }}>Dashboard Page</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <Filters
          ageFilter={ageFilter}
          setAgeFilter={setAgeFilter}
          genderFilter={genderFilter}
          setGenderFilter={setGenderFilter}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <button
          onClick={handleResetPreferences}
          style={{
            padding: "10px",
            backgroundColor: "gray",
            color: "white",
            borderRadius: "5px",
            marginTop: "10px", // Added for better alignment
          }}
        >
          Reset Preferences
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around", // Ensure charts don't overlap
          marginTop: "20px", // Added margin to avoid overlap
        }}
      >
        <div
          style={{
            width: "100%",
            marginTop: "80px",
            maxWidth: "600px",
            height: "300px",
          }}
        >
          <h3 style={{ textAlign: "center" }}>
            Horizontal Bar Chart - Total Time Spent
          </h3>
          {barChartData && (
            <Bar
              data={barChartData}
              options={{
                maintainAspectRatio: false,
                indexAxis: "y",
                onClick: (event, elements) => handleBarClick(elements),
              }}
            />
          )}
        </div>
        <div
          style={{
            width: "100%",
            marginTop: "80px",
            maxWidth: "600px",
            height: "300px",
          }}
        >
          <h3 style={{ textAlign: "center" }}>
            Line Chart - Time Trend for {selectedFeature || "Feature"}
          </h3>
          {lineChartData && (
            <Line
              data={lineChartData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Date",
                    },
                  },
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Time Spent",
                    },
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;