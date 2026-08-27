"use client";

import { createContext, useContext, useState, useEffect } from "react";

// 1. Context Create Karein
const AdminResultContext = createContext();

// =====================================================
// DUMMY RESULTS DATA (UI component se yahan move kar diya)
// =====================================================
const dummyResults = [
  {
    id: 1,
    candidateName: "Rahul Sharma",
    email: "rahul.sharma@gmail.com",
    phone: "+91 98765 43210",
    testName: "JavaScript Fundamentals",
    score: 92,
    totalQuestions: 30,
    correctAnswers: 28,
    submittedAt: "20 Aug 2026, 11:42 AM",
  },
  {
    id: 2,
    candidateName: "Priya Verma",
    email: "priya.verma@gmail.com",
    phone: "+91 98123 45678",
    testName: "React Frontend Challenge",
    score: 89,
    totalQuestions: 45,
    correctAnswers: 40,
    submittedAt: "20 Aug 2026, 12:18 PM",
  },
  {
    id: 3,
    candidateName: "Aman Gupta",
    email: "aman.gupta@gmail.com",
    phone: "+91 99887 66554",
    testName: "Node.js Developer Test",
    score: 84,
    totalQuestions: 40,
    correctAnswers: 34,
    submittedAt: "20 Aug 2026, 01:05 PM",
  },
  {
    id: 4,
    candidateName: "Sneha Kapoor",
    email: "sneha.kapoor@gmail.com",
    phone: "+91 98712 33456",
    testName: "SQL Advanced Assessment",
    score: 78,
    totalQuestions: 35,
    correctAnswers: 27,
    submittedAt: "20 Aug 2026, 02:21 PM",
  },
  {
    id: 5,
    candidateName: "Arjun Mehta",
    email: "arjun.mehta@gmail.com",
    phone: "+91 99111 22334",
    testName: "JavaScript Fundamentals",
    score: 74,
    totalQuestions: 30,
    correctAnswers: 22,
    submittedAt: "20 Aug 2026, 03:10 PM",
  },
  {
    id: 6,
    candidateName: "Neha Singh",
    email: "neha.singh@gmail.com",
    phone: "+91 98222 33445",
    testName: "React Frontend Challenge",
    score: 96,
    totalQuestions: 45,
    correctAnswers: 43,
    submittedAt: "20 Aug 2026, 03:42 PM",
  },
  {
    id: 7,
    candidateName: "Vikas Yadav",
    email: "vikas.yadav@gmail.com",
    phone: "+91 97654 32109",
    testName: "Node.js Developer Test",
    score: 67,
    totalQuestions: 40,
    correctAnswers: 27,
    submittedAt: "20 Aug 2026, 04:18 PM",
  },
  {
    id: 8,
    candidateName: "Anjali Malhotra",
    email: "anjali.malhotra@gmail.com",
    phone: "+91 98989 12121",
    testName: "SQL Advanced Assessment",
    score: 88,
    totalQuestions: 35,
    correctAnswers: 31,
    submittedAt: "20 Aug 2026, 04:56 PM",
  },
  {
    id: 9,
    candidateName: "Rohit Bansal",
    email: "rohit.bansal@gmail.com",
    phone: "+91 98777 66554",
    testName: "JavaScript Fundamentals",
    score: 81,
    totalQuestions: 30,
    correctAnswers: 24,
    submittedAt: "20 Aug 2026, 05:14 PM",
  },
  {
    id: 10,
    candidateName: "Karan Joshi",
    email: "karan.joshi@gmail.com",
    phone: "+91 90011 22334",
    testName: "React Frontend Challenge",
    score: 71,
    totalQuestions: 45,
    correctAnswers: 32,
    submittedAt: "20 Aug 2026, 05:48 PM",
  },
  {
    id: 11,
    candidateName: "Simran Kaur",
    email: "simran.kaur@gmail.com",
    phone: "+91 98888 77766",
    testName: "Node.js Developer Test",
    score: 93,
    totalQuestions: 40,
    correctAnswers: 37,
    submittedAt: "21 Aug 2026, 10:15 AM",
  },
  {
    id: 12,
    candidateName: "Mohit Agarwal",
    email: "mohit.agarwal@gmail.com",
    phone: "+91 97777 11223",
    testName: "SQL Advanced Assessment",
    score: 64,
    totalQuestions: 35,
    correctAnswers: 22,
    submittedAt: "21 Aug 2026, 11:03 AM",
  },
  {
    id: 13,
    candidateName: "Pooja Reddy",
    email: "pooja.reddy@gmail.com",
    phone: "+91 96666 55443",
    testName: "JavaScript Fundamentals",
    score: 87,
    totalQuestions: 30,
    correctAnswers: 26,
    submittedAt: "21 Aug 2026, 12:31 PM",
  },
  {
    id: 14,
    candidateName: "Aditya Raj",
    email: "aditya.raj@gmail.com",
    phone: "+91 95555 44332",
    testName: "React Frontend Challenge",
    score: 79,
    totalQuestions: 45,
    correctAnswers: 35,
    submittedAt: "21 Aug 2026, 01:12 PM",
  },
  {
    id: 15,
    candidateName: "Nisha Jain",
    email: "nisha.jain@gmail.com",
    phone: "+91 94444 33221",
    testName: "Node.js Developer Test",
    score: 91,
    totalQuestions: 40,
    correctAnswers: 36,
    submittedAt: "21 Aug 2026, 02:45 PM",
  },
];

export function AdminResultProvider({ children }) {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // 2. Fetch Data Logic
    useEffect(() => {
        const fetchResults = async () => {
            setIsLoading(true);
            try {
                // =====================================================
                // BACKEND INTEGRATION SPOT
                // =====================================================
                // const response = await fetch('YOUR_API_ENDPOINT/results');
                // const data = await response.json();
                // setResults(data);

                // Fake API Call (500ms delay)
                setTimeout(() => {
                    setResults(dummyResults);
                    setIsLoading(false);
                }, 500);
            } catch (error) {
                console.error("Failed to fetch results:", error);
                setIsLoading(false);
            }
        };

        fetchResults();
    }, []);

    return (
        <AdminResultContext.Provider value={{ results, isLoading }}>
            {children}
        </AdminResultContext.Provider>
    );
}

// 3. Custom Hook (Import karne ke liye)
export const useResults = () => {
    return useContext(AdminResultContext);
};