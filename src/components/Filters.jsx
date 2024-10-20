
// import React from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// function Filters({
//   ageFilter,
//   setAgeFilter,
//   genderFilter,
//   setGenderFilter,
//   startDate,
//   setStartDate,
//   endDate,
//   setEndDate,
// }) {
//   return (
//     <div className="flex flex-col space-y-4">
//       {/* Age Filter */}
//       <div>
//         <span className="mr-2">Age:</span>
//         <button
//           onClick={() => setAgeFilter("15-25")}
//           className={`px-3 py-2 rounded ${
//             ageFilter === "15-25" ? "bg-blue-500 text-white" : "bg-gray-300"
//           }`}
//         >
//           15-25
//         </button>
//         <button
//           onClick={() => setAgeFilter(">25")}
//           className={`ml-2 px-3 py-2 rounded ${
//             ageFilter === ">25" ? "bg-blue-500 text-white" : "bg-gray-300"
//           }`}
//         >
//           25
//         </button>
//       </div>

//       {/* Gender Filter */}
//       <div>
//         <span className="mr-5">Gender:</span>
//         <button
//           onClick={() => setGenderFilter("Male")}
//           className={`px-3 py-2 rounded ${
//             genderFilter === "Male" ? "bg-blue-500 text-white" : "bg-gray-300"
//           }`}
//         >
//           Male
//         </button>
//         <button
//           onClick={() => setGenderFilter("Female")}
//           className={`ml-2 px-3 py-2 rounded ${
//             genderFilter === "Female" ? "bg-blue-500 text-white" : "bg-gray-300"
//           }`}
//         >
//           Female
//         </button>
//       </div>

//       {/* Start Date Picker */}
//       <div>
//         <span className="mr-2">Start Date:</span>
//         <DatePicker
//           selected={startDate}
//           onChange={(date) => setStartDate(date)}
//           dateFormat="yyyy-MM-dd"
//           className="px-3 py-2 border border-gray-300 rounded"
//         />
//       </div>

//       {/* End Date Picker */}
//       <div>
//         <span className="mr-2">End Date:</span>
//         <DatePicker
//           selected={endDate}
//           onChange={(date) => setEndDate(date)}
//           dateFormat="yyyy-MM-dd"
//           className="px-3 py-2 border border-gray-300 rounded"
//         />
//       </div>
//     </div>
//   );
// }

// export default Filters;







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
      {/* Age Filter */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "20px", width: "100px" }}>Age:</span>{" "}
        {/* Added spacing here */}
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

      {/* Gender Filter */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "20px", width: "100px" }}>Gender:</span>{" "}
        {/* Added spacing here */}
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

      {/* Start Date Picker */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "20px", width: "100px" }}>Start Date:</span>{" "}
        {/* Added spacing here */}
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          style={{
            padding: "8px 12px",
          }}
        />
      </div>

      {/* End Date Picker */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "20px", width: "100px" }}>End Date:</span>{" "}
        {/* Added spacing here */}
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
