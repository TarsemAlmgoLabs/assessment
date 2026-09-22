"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
// 1. Context Create Karein
const AdminResultContext = createContext();

export function AdminResultProvider({ children }) {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchResults = async (jobId, assessmentId) => {
        setIsLoading(true);
        try {
            const response = await axios.post(
            "https://assessmentapi.vestaff.com/api/v1/admin/view-results",
            {
              jobId: jobId,
              assessmentId: assessmentId,
              page: 1,
              page_size: 100,
            },
            {
              withCredentials: true,
            }
          );

          console.log("Results:", response.data);
          setResults(results=> response.data.results)
        } catch (error) {
            console.error("Failed to fetch results:", error);
            setIsLoading(false);
        }
    };


    return (
        <AdminResultContext.Provider value={{ results, isLoading, fetchResults }}>
            {children}
        </AdminResultContext.Provider>
    );
}

// 3. Custom Hook (Import karne ke liye)
export const useAdminResults = () => {
    return useContext(AdminResultContext);
};