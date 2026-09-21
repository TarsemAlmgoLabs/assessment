'use client'
import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios'; 

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
  // const fetchResult = async (assessmentId, exp) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.post(
  //     "https://assessmentapi.vestaff.com/api/assessment/history",
  //     {
  //       assessmentId: assessmentId,
  //       exp: exp,
  //       page: 1,
  //       limit: 10,
  //     },
  //     {
  //       withCredentials: true,
  //     }
  //   );
  //     setResultData(response.data);
  //     console.log(response.data)

  //     const mappedResult = {
  //       assessmentName: response.data.assessment_name,
  //       totalQuestions:
  //         response.data.correct_answers + response.data.wrong_answers + response.data.skipped,

  //       correct: response.data.correct_answers,
  //       wrong: response.data.wrong_answers,
  //       skipped: response.data.skipped,

  //       totalMarks: response.data.total_marks,
  //       obtainedMarks: response.data.score,

  //       passingMarks: "",

  //       questions: response.data?.answers?.map((item, index) => ({
  //         id: index + 1,
  //         question: item.statement,

  //         options: item.options.map((option) => option.text),

  //         selectedAnswer:
  //           item.option_marked === -1
  //             ? null
  //             : item.options[item.option_marked]?.text ?? null,

  //         correctAnswer:
  //           item.options[item.correct_option_index]?.text ?? null,
  //       })),
  //     };

  //     setResultData(mappedResult);
  //     // Simulation:
  //     // setResultData(resultData => mockResultData);
  //   } catch (error) {
  //     console.error("Failed to fetch result:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchResult = async (assessmentId, exp) => {
  setLoading(true);

  try {
    const response = await axios.post(
      "https://assessmentapi.vestaff.com/api/assessment/history",
      {
        assessmentId,
        exp,
        page: 1,
        limit: 10,
      },
      {
        withCredentials: true,
      }
    );

    console.log("API RESPONSE:", response.data);

    const data = response.data?.history?.[0];

    if (!data) {
      console.log("No result found");
      return;
    }

    console.log("dsdsd", data)

    const mappedResult = {
      assessmentName: data.assessment_name,
      totalQuestions: data.answers?.length || 0,
      passed: data.passed,
      correct: data.correct_answers,
      wrong: data.wrong_answers,
      skipped: data.skipped,

      totalMarks: data.total_marks,
      obtainedMarks: data.score,

      passingMarks: "",

      questions: (data.answers || []).map((item, index) => {
        const selectedIndex =
          item.option_marked === -1
            ? -1
            : item.option_marked - 1;

        return {
          id: item.question_id,
          inx: index+1,

          question: item.statement,

          options: (item.options || []).map(
            (option) => option.text
          ),

          selectedAnswer:
            selectedIndex === -1
              ? null
              : item.options?.[selectedIndex]?.text || null,

          correctAnswer:
            item.options?.[item.correct_option_index]?.text || null,
          explanation:
            item.explanation|| null,
        };
      }),
    };

    console.log("MAPPED RESULT:", mappedResult);
    console.log(mappedResult)
    setResultData(mappedResult);

  } catch (error) {
    console.error("Failed to fetch result:", error);
  } finally {
    setLoading(false);
  }
};

  const reportQuestionFun = async (questionId, assessmentId, reason, description) => {
    try {
      const response = await axios.post(
        "https://assessmentapi.vestaff.com/api/assessment/report-question",
        {
          questionId: questionId,
          assessmentId: assessmentId,
          reason: reason,
          description:description
        },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to report question:", error);
    }
  };

  // Jab Provider load ho automatically data fetch kar lega
  useEffect(() => {
    fetchResult();
  }, []);

  const value = {
    loading,
    resultData,
    fetchResult,
    reportQuestionFun
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