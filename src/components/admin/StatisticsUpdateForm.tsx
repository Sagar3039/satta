// 3. StatisticsUpdateForm.jsx - Admin Form to update stats

import React, { useState, useEffect } from "react";
import { fetchStatistics, updateStatistics } from "../../../utils/firebaseUtils";
import { toast } from "react-toastify";

const StatisticsUpdateForm = () => {
  const [stats, setStats] = useState({
    totalGamesPlayed: 0,
    mostFrequentNumber: 0,
    numberFrequency: {},
  });

  useEffect(() => {
    const loadStats = async () => {
      const data = await fetchStatistics();
      if (data) setStats(data);
    };
    loadStats();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStats((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleFreqChange = (number, value) => {
    setStats((prev) => ({
      ...prev,
      numberFrequency: {
        ...prev.numberFrequency,
        [number]: Number(value),
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await updateStatistics(stats);
    if (success) toast.success("Statistics updated successfully");
    else toast.error("Failed to update statistics");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-lg font-bold">Update Statistics</h3>
      <input
        type="number"
        name="totalGamesPlayed"
        value={stats.totalGamesPlayed}
        onChange={handleChange}
        placeholder="Total Games Played"
        className="border p-2 m-1"
      />
      <input
        type="number"
        name="mostFrequentNumber"
        value={stats.mostFrequentNumber}
        onChange={handleChange}
        placeholder="Most Frequent Number"
        className="border p-2 m-1"
      />
      <h4 className="font-semibold">Number Frequency (1-10 shown)</h4>
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 10 }).map((_, i) => {
          const number = i + 1;
          return (
            <div key={number}>
              <label>{number}</label>
              <input
                type="number"
                value={stats.numberFrequency[number] || 0}
                onChange={(e) => handleFreqChange(number, e.target.value)}
                className="border p-1 ml-2 w-20"
              />
            </div>
          );
        })}
      </div>
      <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
        Save Stats
      </button>
    </form>
  );
};

export default StatisticsUpdateForm;