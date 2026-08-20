'use client'
import { createContext, useContext, useState, useEffect } from "react";
// import axios from 'axios'; 

const ResultContext = createContext();

// hardcoded mock data
const mockResultData = {
  assessmentName: "JavaScript Skill Assessment",
  totalQuestions: 10,
  correct: 7,
  wrong: 2,
  skipped: 1,
  totalMarks: 10,
  obtainedMarks: 7,
  passingMarks: 6,
  questions: [
    {
      id: 1,
      question: "Which of the following is used to declare a constant in JavaScript?",
      options: ["var", "let", "const", "static"],
      selectedAnswer: "const",
      correctAnswer: "const",
    },
    {
      id: 2,
      question: "What does the === operator check in JavaScript?",
      options: ["Only value", "Only type", "Value and type", "Reference only"],
      selectedAnswer: "Only value",
      correctAnswer: "Value and type",
    },
    {
      id: 3,
      question: "Which method is used to create a new array by transforming every element?",
      options: ["filter()", "map()", "reduce()", "forEach()"],
      selectedAnswer: "map()",
      correctAnswer: "map()",
    },
    {
      id: 4,
      question: "Which of the following is NOT a JavaScript primitive type?",
      options: ["String", "Boolean", "Object", "Number"],
      selectedAnswer: "Object",
      correctAnswer: "Object",
    },
    {
      id: 5,
      question: "What will typeof null return in JavaScript?",
      options: ["null", "undefined", "object", "boolean"],
      selectedAnswer: "undefined",
      correctAnswer: "object",
    },
    {
      id: 6,
      question: "Which keyword is used to handle errors in JavaScript?",
      options: ["catch", "error", "handle", "exception"],
      selectedAnswer: null,
      correctAnswer: "catch",
    },
    {
      id: 7,
      question: "Which function converts a JSON string into a JavaScript object?",
      options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"],
      selectedAnswer: "JSON.parse()",
      correctAnswer: "JSON.parse()",
    },
    {
      id: 8,
      question: "What is the output of Boolean(0) in JavaScript?",
      options: ["true", "false", "undefined", "null"],
      selectedAnswer: "false",
      correctAnswer: "false",
    },
    {
      id: 9,
      question: "Which array method removes the last element?",
      options: ["shift()", "remove()", "pop()", "delete()"],
      selectedAnswer: "remove()",
      correctAnswer: "pop()",
    },
    {
      id: 10,
      question: "Which statement is used to exit a loop immediately?",
      options: ["stop", "exit", "break", "return"],
      selectedAnswer: "break",
      correctAnswer: "break",
    },
  ],
};

export const ResultProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);

  // Jab component mount ho, tab mock data load kar do (simulate API call)
  const fetchResult = async () => {
    setLoading(true);
    try {
      // const response = await axios.get("/api/assessment/result");
      // setResultData(response.data);
      
      // Simulation:
      setResultData(resultData => mockResultData);
    } catch (error) {
      console.error("Failed to fetch result:", error);
    } finally {
      setLoading(false);
    }
  };

  // Jab Provider load ho automatically data fetch kar lega
  useEffect(() => {
    fetchResult();
  }, []);

  const value = {
    loading,
    resultData,
    fetchResult
  };

  return (
    <ResultContext.Provider value={value}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResult = () => {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error("useResult must be used inside ResultProvider");
  }
  return context;
};