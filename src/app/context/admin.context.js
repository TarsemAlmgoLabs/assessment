"use client";

import { createContext, useContext, useState, useEffect } from "react";

// 1. Context Create Karein
const AssessmentContext = createContext();

// =====================================================
// DUMMY DATA (Yahan move kar diya hai)
// =====================================================
const dummyLiveTests = [
  {
    id: 1,
    title: "JavaScript Assessment",
    category: "Frontend",
    description:
      "Evaluate JavaScript fundamentals, ES6+, async programming and modern patterns.",
    duration: "45 min",
    candidates: 124,
    questions: 35,
    time: "10:30 AM - 11:15 AM",
    activeCandidates: 68,
  },
  {
    id: 2,
    title: "React.js Assessment",
    category: "Frontend",
    description:
      "Evaluate React skills including hooks, state management, components and performance.",
    duration: "50 min",
    candidates: 86,
    questions: 40,
    time: "11:00 AM - 11:50 AM",
    activeCandidates: 42,
  },
  {
    id: 3,
    title: "Node.js & Express",
    category: "Backend",
    description:
      "Test backend expertise with Node.js, Express, APIs, middleware and architecture.",
    duration: "60 min",
    candidates: 73,
    questions: 45,
    time: "11:15 AM - 12:15 PM",
    activeCandidates: 51,
  },
  {
    id: 4,
    title: "Python Developer Assessment",
    category: "Backend",
    description:
      "Assess Python programming, data structures, APIs and object-oriented programming.",
    duration: "50 min",
    candidates: 91,
    questions: 40,
    time: "12:00 PM - 12:50 PM",
    activeCandidates: 37,
  },
];

const dummyUpcomingTests = [
  {
    id: 5,
    title: "SQL & Database",
    category: "Database",
    description:
      "Measure SQL skills including joins, indexing, normalization and query optimization.",
    duration: "40 min",
    candidates: 112,
    questions: 30,
    date: "25 Aug 2026",
    time: "02:00 PM",
  },
  {
    id: 6,
    title: "Advanced React",
    category: "Frontend",
    description:
      "Advanced React assessment covering architecture, optimization and scalable patterns.",
    duration: "60 min",
    candidates: 94,
    questions: 45,
    date: "26 Aug 2026",
    time: "11:00 AM",
  },
  {
    id: 7,
    title: "System Design",
    category: "Architecture",
    description:
      "Evaluate system design, scalability, distributed systems and architecture decisions.",
    duration: "75 min",
    candidates: 64,
    questions: 25,
    date: "27 Aug 2026",
    time: "03:30 PM",
  },
  {
    id: 8,
    title: "Backend Architecture",
    category: "Backend",
    description:
      "Assess API architecture, scalability, microservices and backend engineering practices.",
    duration: "70 min",
    candidates: 58,
    questions: 35,
    date: "28 Aug 2026",
    time: "04:30 PM",
  },
];

const dummyPastTests = [
  {
    id: 9,
    title: "JavaScript Fundamentals",
    category: "Frontend",
    description:
      "Fundamental JavaScript assessment covering variables, functions, arrays and objects.",
    duration: "35 min",
    candidates: 156,
    questions: 30,
    date: "20 Aug 2026",
    time: "11:00 AM",
    score: 92,
  },
  {
    id: 10,
    title: "Node.js Developer Test",
    category: "Backend",
    description:
      "Completed backend assessment covering APIs, async operations and Express.",
    duration: "50 min",
    candidates: 98,
    questions: 40,
    date: "18 Aug 2026",
    time: "03:00 PM",
    score: 84,
  },
  {
    id: 11,
    title: "React Frontend Challenge",
    category: "Frontend",
    description:
      "Frontend assessment covering React components, hooks and state management.",
    duration: "60 min",
    candidates: 121,
    questions: 45,
    date: "16 Aug 2026",
    time: "01:00 PM",
    score: 89,
  },
  {
    id: 12,
    title: "SQL Advanced Assessment",
    category: "Database",
    description:
      "Advanced SQL evaluation covering complex queries, joins and optimization.",
    duration: "45 min",
    candidates: 87,
    questions: 35,
    date: "14 Aug 2026",
    time: "10:30 AM",
    score: 78,
  },
];


export function AssessmentProvider({ children }) {
  const [liveTests, setLiveTests] = useState([]);
  const [upcomingTests, setUpcomingTests] = useState([]);
  const [pastTests, setPastTests] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // API Loading State

  // 2. Fetch Data Logic
  useEffect(() => {
    const fetchAssessments = async () => {
      setIsLoading(true);
      try {
        // =====================================================
        // BACKEND INTEGRATION SPOT
        // =====================================================
        // Kal ko jab API ready ho jaye toh bas is hisse ko hata kar ye karna hai:
        // const response = await fetch('YOUR_API_ENDPOINT');
        // const data = await response.json();
        // setLiveTests(data.liveTests);
        // setUpcomingTests(data.upcomingTests);
        // setPastTests(data.pastTests);

        // Filhal ke liye Fake API Call (500ms delay ke sath)
        setTimeout(() => {
          setLiveTests(dummyLiveTests); // (Yahan apna pure dummy arrays rakhna)
          setUpcomingTests(dummyUpcomingTests);
          setPastTests(dummyPastTests);
          setIsLoading(false);
        }, 500);
        
      } catch (error) {
        console.error("Failed to fetch assessments:", error);
        setIsLoading(false);
      }
    };

    fetchAssessments();
  }, []); // Empty dependency array matlab page load par ek baar chalega

  return (
    <AssessmentContext.Provider value={{ liveTests, upcomingTests, pastTests, isLoading }}>
      {children}
    </AssessmentContext.Provider>
  );
}

// 3. Custom Hook (Import karne me aasan hota hai)
export const useAssessments = () => {
  return useContext(AssessmentContext);
};