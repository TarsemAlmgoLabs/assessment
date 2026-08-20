"use client";
import { createContext, useContext, useState, useEffect } from "react";
// import axios from 'axios'; // 

const HistoryContext = createContext();

//hardcoded history data
const mockHistoryData = [
  {
    id: "assessment-001",
    name: "JavaScript Skill Assessment",
    date: "18 Aug 2026",
    time: "07:42 PM",
    score: 24,
    totalMarks: 30,
    percentage: 80,
    correct: 24,
    wrong: 4,
    skipped: 2,
    status: "passed",
  },
  {
    id: "assessment-002",
    name: "React.js Developer Assessment",
    date: "14 Aug 2026",
    time: "06:18 PM",
    score: 21,
    totalMarks: 30,
    percentage: 70,
    correct: 21,
    wrong: 6,
    skipped: 3,
    status: "passed",
  },
  {
    id: "assessment-003",
    name: "Node.js Backend Assessment",
    date: "09 Aug 2026",
    time: "08:05 PM",
    score: 16,
    totalMarks: 30,
    percentage: 53,
    correct: 16,
    wrong: 9,
    skipped: 5,
    status: "failed",
  },
  {
    id: "assessment-004",
    name: "MongoDB & Database Assessment",
    date: "03 Aug 2026",
    time: "05:32 PM",
    score: 27,
    totalMarks: 30,
    percentage: 90,
    correct: 27,
    wrong: 2,
    skipped: 1,
    status: "passed",
  },
  {
    id: "assessment-005",
    name: "Frontend Fundamentals",
    date: "28 Jul 2026",
    time: "04:11 PM",
    score: 18,
    totalMarks: 30,
    percentage: 60,
    correct: 18,
    wrong: 8,
    skipped: 4,
    status: "passed",
  },
  {
    id: "assessment-006",
    name: "JavaScript Advanced Concepts",
    date: "21 Jul 2026",
    time: "07:26 PM",
    score: 13,
    totalMarks: 30,
    percentage: 43,
    correct: 13,
    wrong: 12,
    skipped: 5,
    status: "failed",
  },
];

export const HistoryProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState(null);

  // Simulate API Call
  const fetchHistory = async () => {
    setLoading(true);
    try {
      // const response = await axios.get("/api/assessment/history");
      // setHistoryData(response.data);
      
      // Simulation ke liye directly state set kar rahe hain:
      setHistoryData((prev) => mockHistoryData);
    } catch (error) {
      console.error("Failed to fetch history:", error);
    } finally {
      setLoading(false);
    }
  };

  // Jab application load ho tab list fetch kar le
  useEffect(() => {
    fetchHistory();
  }, []);

  const value = {
    loading,
    historyData,
    fetchHistory,
  };

  return (
    <HistoryContext.Provider value={value}>
      {children}
    </HistoryContext.Provider>
  );
};

// Hook jisko tu apne components me use karega
export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used inside HistoryProvider");
  }
  return context;
};