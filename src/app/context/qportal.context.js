'use client';

import { createContext, useContext, useState } from "react";
import axios from "axios";

const QportalContext = createContext(null);

const Questions = [
  {
    id: 1,
    question:
      "Which of the following is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: 2,
    codeSnippet: `const PI = 3.14;
console.log(PI);`,
  },
  {
    id: 2,
    question: "What does the === operator check in JavaScript?",
    options: [
      "Only value",
      "Only type",
      "Value and type",
      "Reference only",
    ],
    answer: 2,
    codeSnippet: `const a = 10;
const b = "10";

console.log(a === b);`,
  },
  {
    id: 3,
    question:
      "Which method is used to create a new array by transforming every element?",
    options: ["filter()", "map()", "reduce()", "forEach()"],
    answer: 1,
    codeSnippet: `const numbers = [1, 2, 3, 4];

const doubled = numbers.map((num) => num * 2);

console.log(doubled);`,
  },
  {
    id: 4,
    question: "Which of the following is NOT a JavaScript primitive type?",
    options: ["String", "Boolean", "Object", "Number"],
    answer: 2,
    codeSnippet: `const name = "Tarsem";
const isActive = true;
const age = 24;
const user = { name: "Tarsem" };`,
  },
  {
    id: 5,
    question: "What will typeof null return in JavaScript?",
    options: ["null", "undefined", "object", "boolean"],
    answer: 2,
    codeSnippet: `const value = null;

console.log(typeof value);`,
  },
  {
    id: 6,
    question: "Which keyword is used to handle errors in JavaScript?",
    options: ["catch", "error", "handle", "exception"],
    answer: 0,
    codeSnippet: `try {
  const result = riskyFunction();
  console.log(result);
} catch (error) {
  console.log("Something went wrong");
}`,
  },
  {
    id: 7,
    question:
      "Which function converts a JSON string into a JavaScript object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.object()",
      "JSON.convert()",
    ],
    answer: 0,
    codeSnippet: `const json = '{"name":"Tarsem","age":24}';

const user = JSON.parse(json);

console.log(user.name);`,
  },
  {
    id: 8,
    question: "What is the output of Boolean(0) in JavaScript?",
    options: ["true", "false", "undefined", "null"],
    answer: 1,
    codeSnippet: `const value = 0;

console.log(Boolean(value));`,
  },
  {
    id: 9,
    question: "Which array method removes the last element?",
    options: ["shift()", "remove()", "pop()", "delete()"],
    answer: 2,
    codeSnippet: `const fruits = ["Apple", "Banana", "Mango"];

fruits.pop();

console.log(fruits);`,
  },
  {
    id: 10,
    question: "Which statement is used to exit a loop immediately?",
    options: ["stop", "exit", "break", "return"],
    answer: 2,
    codeSnippet: `for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break;
  }

  console.log(i);
}`,
  },
];

export const QportalProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const loadAssessment = async (title, exp, skills, assessmentId) => {
    try {
        setLoading(true);

        // const response = await axios.post("/api/assessment/load", {
        // title,
        // exp,
        // skills,
        // assessmentId,
        // });

        setQuestions(questions=> Questions)

        return response.data;
    } catch (error) {
        console.error("Failed to load assessment:", error);

        throw error;
    } finally {
        setLoading(false);
    }
    };

  const value = {
    loading,
    setLoading,
    questions,
    loadAssessment
  };

  return (
    <QportalContext.Provider value={value}>
      {children}
    </QportalContext.Provider>
  );
};

// Custom hook
export const useQportal = () => {
  const context = useContext(QportalContext);

  if (!context) {
    throw new Error("useQportal must be used inside QportalProvider");
  }

  return context;
};