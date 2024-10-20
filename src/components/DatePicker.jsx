import React, { useState, useEffect } from "react";
import { format } from "date-fns";

function DatePicker({ dateRange, setDateRange }) {
  const [startDate, setStartDate] = useState(
    format(dateRange[0], "yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState(format(dateRange[1], "yyyy-MM-dd"));

  useEffect(() => {
    setStartDate(format(dateRange[0], "yyyy-MM-dd"));
    setEndDate(format(dateRange[1], "yyyy-MM-dd"));
  }, [dateRange]);

  const handleStartDateChange = (e) => {
    const newStartDate = new Date(e.target.value);
    setStartDate(e.target.value);
    setDateRange([newStartDate, dateRange[1]]);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = new Date(e.target.value);
    setEndDate(e.target.value);
    setDateRange([dateRange[0], newEndDate]);
  };

  return (
    <div className="flex flex-col">
      <label className="font-bold mb-2">Date Range:</label>
      <div className="flex items-center space-x-4">
        <div>
          <label className="mr-2">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label className="mr-2">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="border p-2 rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default DatePicker;
