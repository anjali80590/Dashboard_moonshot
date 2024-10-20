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
