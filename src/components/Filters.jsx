import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Filters({
  ageFilter,
  setAgeFilter,
  genderFilter,
  setGenderFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "20px", width: "100px" }}>Age:</span>{" "}
        <button
          onClick={() => setAgeFilter("15-25")}
          style={{
            padding: "8px 12px",
            marginRight: "10px",
          }}
        >
          15-25
        </button>
        <button
          onClick={() => setAgeFilter(">25")}
          style={{
            padding: "8px 12px",
          }}
        >
          25+
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "20px", width: "100px" }}>Gender:</span>{" "}
        <button
          onClick={() => setGenderFilter("Male")}
          style={{
            padding: "8px 12px",
            marginRight: "10px",
          }}
        >
          Male
        </button>
        <button
          onClick={() => setGenderFilter("Female")}
          style={{
            padding: "8px 12px",
          }}
        >
          Female
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "20px", width: "100px" }}>Start Date:</span>{" "}
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          style={{
            padding: "8px 12px",
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "20px", width: "100px" }}>End Date:</span>{" "}
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          style={{
            padding: "8px 12px",
          }}
        />
      </div>
    </div>
  );
}

export default Filters;
