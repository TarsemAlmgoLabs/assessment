"use client";

import { createContext, useContext, useState, useEffect } from "react";

// 1. Context Create
const ManageAssessmentContext = createContext();

// =====================================================
// DUMMY DATA (Single Assessment jo edit ho raha hai)
// =====================================================
const dummyAssessment = {
  id: 1,
  title: "Advanced React Assessment",
  category: "Frontend",
  description: "Advanced React assessment covering hooks, state management, performance and scalable architecture.",
  candidates: 94,
  questions: 45,
  duration: "60 Minutes",
  startDate: "2026-08-26",
  startTime: "11:00",
  endDate: "2026-08-28",
  endTime: "18:00",
  status: "upcoming",
};

export function ManageAssessmentProvider({ children }) {
  const [assessment, setAssessment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Fetch Single Assessment (Kal ko yahan ID pass karke DB se fetch hoga)
  useEffect(() => {
    const fetchAssessment = async () => {
      setIsLoading(true);
      try {
        // BACKEND API YAHAN AAYEGI
        // const response = await fetch('/api/assessments/1'); 
        // const data = await response.json();
        
        setTimeout(() => {
          setAssessment(dummyAssessment);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch assessment:", error);
        setIsLoading(false);
      }
    };

    fetchAssessment();
  }, []);

  // 3. Update/Save Logic
  const updateSchedule = async (updatedData) => {
    try {
      // Yahan PUT/PATCH API call aayegi
      // await fetch('/api/assessments/1', { method: 'PUT', body: JSON.stringify(updatedData) });
      
      return new Promise((resolve) => {
        setTimeout(() => {
          setAssessment(updatedData); // Naya data state me set kar diya
          resolve(true); // Success signal bheja
        }, 800);
      });
    } catch (error) {
      console.error("Error updating schedule:", error);
      return false;
    }
  };

  // 4. Cancel Logic
  const cancelAssessment = async () => {
    try {
      // Yahan DELETE ya Status Update (status: 'cancelled') API call aayegi
      return new Promise((resolve) => {
        setTimeout(() => {
          setAssessment((prev) => ({ ...prev, status: "cancelled" }));
          resolve(true);
        }, 800);
      });
    } catch (error) {
      console.error("Error cancelling assessment:", error);
      return false;
    }
  };

  return (
    <ManageAssessmentContext.Provider 
      value={{ assessment, isLoading, updateSchedule, cancelAssessment }}
    >
      {children}
    </ManageAssessmentContext.Provider>
  );
}

// Custom Hook
export const useManageAssessment = () => {
  return useContext(ManageAssessmentContext);
};