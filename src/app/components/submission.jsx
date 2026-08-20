// "use client";
// import Link from "next/link";
// import React from "react";
// import {
//   ArrowLeft,
//   Check,
//   CheckCircle2,
//   ShieldCheck,
//   X,
//   XCircle,
// } from "lucide-react";

// const result = {
//   assessmentName: "JavaScript Skill Assessment",

//   totalQuestions: 10,
//   correct: 7,
//   wrong: 2,
//   skipped: 1,

//   totalMarks: 10,
//   obtainedMarks: 7,
//   passingMarks: 6,

//   questions: [
//     {
//       id: 1,
//       question:
//         "Which of the following is used to declare a constant in JavaScript?",
//       options: ["var", "let", "const", "static"],
//       selectedAnswer: "const",
//       correctAnswer: "const",
//     },
//     {
//       id: 2,
//       question:
//         "What does the === operator check in JavaScript?",
//       options: [
//         "Only value",
//         "Only type",
//         "Value and type",
//         "Reference only",
//       ],
//       selectedAnswer: "Only value",
//       correctAnswer: "Value and type",
//     },
//     {
//       id: 3,
//       question:
//         "Which method is used to create a new array by transforming every element?",
//       options: ["filter()", "map()", "reduce()", "forEach()"],
//       selectedAnswer: "map()",
//       correctAnswer: "map()",
//     },
//     {
//       id: 4,
//       question:
//         "Which of the following is NOT a JavaScript primitive type?",
//       options: ["String", "Boolean", "Object", "Number"],
//       selectedAnswer: "Object",
//       correctAnswer: "Object",
//     },
//     {
//       id: 5,
//       question:
//         "What will typeof null return in JavaScript?",
//       options: ["null", "undefined", "object", "boolean"],
//       selectedAnswer: "undefined",
//       correctAnswer: "object",
//     },
//     {
//       id: 6,
//       question:
//         "Which keyword is used to handle errors in JavaScript?",
//       options: ["catch", "error", "handle", "exception"],
//       selectedAnswer: null,
//       correctAnswer: "catch",
//     },
//     {
//       id: 7,
//       question:
//         "Which function converts a JSON string into a JavaScript object?",
//       options: [
//         "JSON.parse()",
//         "JSON.stringify()",
//         "JSON.object()",
//         "JSON.convert()",
//       ],
//       selectedAnswer: "JSON.parse()",
//       correctAnswer: "JSON.parse()",
//     },
//     {
//       id: 8,
//       question:
//         "What is the output of Boolean(0) in JavaScript?",
//       options: ["true", "false", "undefined", "null"],
//       selectedAnswer: "false",
//       correctAnswer: "false",
//     },
//     {
//       id: 9,
//       question:
//         "Which array method removes the last element?",
//       options: ["shift()", "remove()", "pop()", "delete()"],
//       selectedAnswer: "remove()",
//       correctAnswer: "pop()",
//     },
//     {
//       id: 10,
//       question:
//         "Which statement is used to exit a loop immediately?",
//       options: ["stop", "exit", "break", "return"],
//       selectedAnswer: "break",
//       correctAnswer: "break",
//     },
//   ],
// };

// export default function AssessmentResult() {
//   const percentage = Math.round(
//     (result.obtainedMarks / result.totalMarks) * 100
//   );

//   const passed =
//     result.obtainedMarks >= result.passingMarks;

//   return (
//     <div className="min-h-screen bg-[#080d13] text-white">

//       {/* =====================================================
//           HEADER
//       ====================================================== */}

//       <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0b1119]/95 backdrop-blur-xl">

//         <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

//           <div className="flex items-center gap-3">

//             <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/10 text-cyan-400">
//               <ShieldCheck size={20} />
//             </div>

//             <div>
//               <h1 className="text-sm font-bold text-white sm:text-base">
//                 Assessment Result
//               </h1>

//               <p className="hidden text-xs text-slate-500 sm:block">
//                 VeStaff Candidate Portal
//               </p>
//             </div>

//           </div>

//           <div
//             className={`
//               flex items-center gap-2 rounded-full border px-3 py-1.5
//               text-xs font-bold
//               ${
//                 passed
//                   ? "border-emerald-400/15 bg-emerald-400/10 text-emerald-400"
//                   : "border-red-400/15 bg-red-400/10 text-red-400"
//               }
//             `}
//           >
//             {passed ? (
//               <CheckCircle2 size={14} />
//             ) : (
//               <XCircle size={14} />
//             )}

//             {passed ? "Passed" : "Failed"}
//           </div>

//         </div>
//       </header>

//       {/* =====================================================
//           MAIN
//       ====================================================== */}

//       <main
//         className="
//           relative mx-auto max-w-6xl
//           px-4 py-6 sm:px-6 sm:py-8 lg:px-8
//         "
//       >

//         {/* Subtle background glow */}
//         <div className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/[0.025] blur-[120px]" />

//         {/* =================================================
//             SCORE
//         ================================================== */}

//         <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d141e] shadow-[0_10px_40px_rgba(0,0,0,0.18)]">

//           <div className="p-6 sm:p-8">

//             <div className="text-center">

//               {/* Status */}
//               <div
//                 className={`
//                   mx-auto inline-flex items-center gap-2
//                   rounded-full border px-3 py-1.5
//                   text-[10px] font-bold uppercase tracking-[0.16em]
//                   ${
//                     passed
//                       ? "border-emerald-400/15 bg-emerald-400/10 text-emerald-400"
//                       : "border-red-400/15 bg-red-400/10 text-red-400"
//                   }
//                 `}
//               >
//                 {passed ? (
//                   <CheckCircle2 size={14} />
//                 ) : (
//                   <XCircle size={14} />
//                 )}

//                 {passed ? "Assessment Passed" : "Assessment Failed"}
//               </div>

//               <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
//                 {result.assessmentName}
//               </h2>

//               <p className="mt-2 text-sm text-slate-500">
//                 Your assessment has been evaluated successfully.
//               </p>

//               {/* Score */}
//               <div className="mt-6">

//                 <div
//                   className={`
//                     text-5xl font-black tracking-tight sm:text-6xl
//                     ${
//                       passed
//                         ? "text-cyan-300"
//                         : "text-red-400"
//                     }
//                   `}
//                 >
//                   {percentage}%
//                 </div>

//                 <p className="mt-1 text-xs font-medium text-slate-500">
//                   Overall Score
//                 </p>

//                 <p className="mt-2 text-sm text-slate-400">
//                   {result.obtainedMarks} / {result.totalMarks} Marks
//                 </p>

//               </div>
//             </div>

//             {/* =================================================
//                 STATS
//             ================================================== */}

//             <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">

//               <ResultStat
//                 label="Total Questions"
//                 value={result.totalQuestions}
//               />

//               <ResultStat
//                 label="Correct"
//                 value={result.correct}
//                 variant="green"
//               />

//               <ResultStat
//                 label="Wrong"
//                 value={result.wrong}
//                 variant="red"
//               />

//               <ResultStat
//                 label="Skipped"
//                 value={result.skipped}
//                 variant="yellow"
//               />

//             </div>

//           </div>
//         </section>

//         {/* =================================================
//             QUESTION RESULTS
//         ================================================== */}

//         <section className="mt-8">

//           <div className="mb-5">

//             <h3 className="text-xl font-bold text-white">
//               Question Review
//             </h3>

//             <p className="mt-1 text-sm text-slate-500">
//               Review your selected answers against the correct answers.
//             </p>

//           </div>

//           <div className="space-y-5">

//             {result.questions.map((item) => {

//               const isSkipped = !item.selectedAnswer;

//               const isCorrect =
//                 !isSkipped &&
//                 item.selectedAnswer === item.correctAnswer;

//               return (
//                 <QuestionResult
//                   key={item.id}
//                   question={item}
//                   isCorrect={isCorrect}
//                   isSkipped={isSkipped}
//                 />
//               );
//             })}

//           </div>

//         </section>

//         {/* =================================================
//             BACK
//         ================================================== */}

//         <div className="flex justify-center py-8">

//           <Link
//             href="/"
//             className="
//               flex items-center justify-center gap-2
//               rounded-xl border border-white/[0.08]
//               bg-[#0d141e] px-6 py-3
//               text-sm font-semibold text-slate-300
//               shadow-sm transition-all
//               hover:border-white/[0.15]
//               hover:bg-[#111a25]
//             "
//           >
//             <ArrowLeft size={17} />
//             Back to Assessments
//           </Link>

//         </div>

//       </main>
//     </div>
//   );
// }

// /* =========================================================
//    QUESTION RESULT
// ========================================================= */

// function QuestionResult({
//   question,
//   isCorrect,
//   isSkipped,
// }) {
//   return (
//     <div
//       className={`
//         overflow-hidden rounded-2xl border
//         bg-[#0d141e]
//         shadow-[0_5px_25px_rgba(0,0,0,0.12)]
//         ${
//           isCorrect
//             ? "border-emerald-400/15"
//             : isSkipped
//             ? "border-yellow-400/15"
//             : "border-red-400/15"
//         }
//       `}
//     >

//       {/* =================================================
//           QUESTION HEADER
//       ================================================== */}

//       <div className="flex items-start gap-3 border-b border-white/[0.06] p-5 sm:p-6">

//         {/* Number */}
//         <div
//           className={`
//             flex h-9 w-9 shrink-0 items-center
//             justify-center rounded-lg
//             text-xs font-bold
//             ${
//               isCorrect
//                 ? "bg-emerald-400/10 text-emerald-400"
//                 : isSkipped
//                 ? "bg-yellow-400/10 text-yellow-400"
//                 : "bg-red-400/10 text-red-400"
//             }
//           `}
//         >
//           {question.id}
//         </div>

//         {/* Question */}
//         <div className="min-w-0 flex-1">

//           <div className="flex items-start justify-between gap-3">

//             <h4 className="text-sm font-semibold leading-6 text-slate-200 sm:text-base">
//               {question.question}
//             </h4>

//             {isCorrect ? (
//               <CheckCircle2
//                 size={20}
//                 className="shrink-0 text-emerald-400"
//               />
//             ) : isSkipped ? (
//               <span className="shrink-0 rounded-full border border-yellow-400/15 bg-yellow-400/10 px-2 py-1 text-[9px] font-bold text-yellow-400">
//                 SKIPPED
//               </span>
//             ) : (
//               <XCircle
//                 size={20}
//                 className="shrink-0 text-red-400"
//               />
//             )}

//           </div>
//         </div>

//       </div>

//       {/* =================================================
//           ALL OPTIONS
//       ================================================== */}

//       <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">

//         {question.options.map((option, index) => {

//           const isSelected =
//             question.selectedAnswer === option;

//           const isAnswer =
//             question.correctAnswer === option;

//           let optionStyle =
//             "border-white/[0.07] bg-[#111a25] text-slate-400";

//           let badgeStyle =
//             "border-white/[0.08] bg-white/[0.03] text-slate-500";

//           /*
//             CORRECT ANSWER
//           */
//           if (isAnswer) {
//             optionStyle =
//               "border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-200";

//             badgeStyle =
//               "border-emerald-400/25 bg-emerald-400/10 text-emerald-400";
//           }

//           /*
//             SELECTED WRONG ANSWER
//           */
//           if (isSelected && !isAnswer) {
//             optionStyle =
//               "border-red-400/25 bg-red-400/[0.07] text-red-200";

//             badgeStyle =
//               "border-red-400/25 bg-red-400/10 text-red-400";
//           }

//           return (
//             <div
//               key={option}
//               className={`
//                 flex min-w-0 items-center gap-3
//                 rounded-xl border p-3.5
//                 transition-all
//                 sm:p-4
//                 ${optionStyle}
//               `}
//             >

//               {/* Letter */}
//               <span
//                 className={`
//                   flex h-9 w-9 shrink-0 items-center
//                   justify-center rounded-lg border
//                   text-xs font-bold sm:h-10 sm:w-10
//                   ${badgeStyle}
//                 `}
//               >
//                 {String.fromCharCode(65 + index)}
//               </span>

//               {/* Text */}
//               <span className="min-w-0 flex-1 break-all text-sm font-medium leading-6">
//                 {option}
//               </span>

//               {/* Correct */}
//               {isAnswer && (
//                 <div className="flex shrink-0 items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide text-emerald-400">
//                   <Check size={15} />
//                   Correct
//                 </div>
//               )}

//               {/* User selected wrong */}
//               {isSelected && !isAnswer && (
//                 <div className="flex shrink-0 items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide text-red-400">
//                   <X size={15} />
//                   Your Answer
//                 </div>
//               )}

//             </div>
//           );
//         })}

//       </div>

//       {/* =================================================
//           RESULT FOOTER
//       ================================================== */}

//       <div
//         className={`
//           border-t px-5 py-3 text-xs font-semibold sm:px-6
//           ${
//             isCorrect
//               ? "border-emerald-400/10 bg-emerald-400/[0.04] text-emerald-400"
//               : isSkipped
//               ? "border-yellow-400/10 bg-yellow-400/[0.04] text-yellow-400"
//               : "border-red-400/10 bg-red-400/[0.04] text-red-400"
//           }
//         `}
//       >
//         {isCorrect
//           ? "You selected the correct answer."
//           : isSkipped
//           ? "You did not answer this question."
//           : "Your selected answer was incorrect."}
//       </div>

//     </div>
//   );
// }

// /* =========================================================
//    SCORE STAT
// ========================================================= */

// function ResultStat({
//   label,
//   value,
//   variant,
// }) {
//   const styles = {
//     green:
//       "border-emerald-400/10 bg-emerald-400/[0.04] text-emerald-400",

//     red:
//       "border-red-400/10 bg-red-400/[0.04] text-red-400",

//     yellow:
//       "border-yellow-400/10 bg-yellow-400/[0.04] text-yellow-400",

//     default:
//       "border-white/[0.06] bg-white/[0.02] text-white",
//   };

//   return (
//     <div
//       className={`
//         rounded-xl border p-4 text-center
//         ${styles[variant] || styles.default}
//       `}
//     >
//       <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">
//         {label}
//       </p>

//       <p className="mt-1 text-2xl font-black">
//         {value}
//       </p>
//     </div>
//   );
// }


"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Flag,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";
import { useResult } from "../context/Result.context"; 

// const result = {
//   assessmentName: "JavaScript Skill Assessment",

//   totalQuestions: 10,
//   correct: 7,
//   wrong: 2,
//   skipped: 1,

//   totalMarks: 10,
//   obtainedMarks: 7,
//   passingMarks: 6,

//   questions: [
//     {
//       id: 1,
//       question:
//         "Which of the following is used to declare a constant in JavaScript?",
//       options: ["var", "let", "const", "static"],
//       selectedAnswer: "const",
//       correctAnswer: "const",
//     },
//     {
//       id: 2,
//       question:
//         "What does the === operator check in JavaScript?",
//       options: [
//         "Only value",
//         "Only type",
//         "Value and type",
//         "Reference only",
//       ],
//       selectedAnswer: "Only value",
//       correctAnswer: "Value and type",
//     },
//     {
//       id: 3,
//       question:
//         "Which method is used to create a new array by transforming every element?",
//       options: ["filter()", "map()", "reduce()", "forEach()"],
//       selectedAnswer: "map()",
//       correctAnswer: "map()",
//     },
//     {
//       id: 4,
//       question:
//         "Which of the following is NOT a JavaScript primitive type?",
//       options: ["String", "Boolean", "Object", "Number"],
//       selectedAnswer: "Object",
//       correctAnswer: "Object",
//     },
//     {
//       id: 5,
//       question:
//         "What will typeof null return in JavaScript?",
//       options: ["null", "undefined", "object", "boolean"],
//       selectedAnswer: "undefined",
//       correctAnswer: "object",
//     },
//     {
//       id: 6,
//       question:
//         "Which keyword is used to handle errors in JavaScript?",
//       options: ["catch", "error", "handle", "exception"],
//       selectedAnswer: null,
//       correctAnswer: "catch",
//     },
//     {
//       id: 7,
//       question:
//         "Which function converts a JSON string into a JavaScript object?",
//       options: [
//         "JSON.parse()",
//         "JSON.stringify()",
//         "JSON.object()",
//         "JSON.convert()",
//       ],
//       selectedAnswer: "JSON.parse()",
//       correctAnswer: "JSON.parse()",
//     },
//     {
//       id: 8,
//       question:
//         "What is the output of Boolean(0) in JavaScript?",
//       options: ["true", "false", "undefined", "null"],
//       selectedAnswer: "false",
//       correctAnswer: "false",
//     },
//     {
//       id: 9,
//       question:
//         "Which array method removes the last element?",
//       options: ["shift()", "remove()", "pop()", "delete()"],
//       selectedAnswer: "remove()",
//       correctAnswer: "pop()",
//     },
//     {
//       id: 10,
//       question:
//         "Which statement is used to exit a loop immediately?",
//       options: ["stop", "exit", "break", "return"],
//       selectedAnswer: "break",
//       correctAnswer: "break",
//     },
//   ],
// };

const reportReasons = [
  "Question is incorrect",
  "Correct answer is incorrect",
  "Question is unclear",
  "More than one correct answer",
  "No correct answer",
  "Other",
];

export default function AssessmentResult() {
  const { resultData: result, loading } = useResult();

  if (loading || !result) {
    return (
      <div className="min-h-screen bg-[#080d13] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>
      </div>
    );
  }



  const [reportQuestion, setReportQuestion] = useState(null);
  const [reportedQuestions, setReportedQuestions] = useState({});
  const [reportReason, setReportReason] = useState("");
  const [reportDescription, setReportDescription] = useState("");

  const percentage = Math.round(
    (result.obtainedMarks / result.totalMarks) * 100
  );

  const passed =
    result.obtainedMarks >= result.passingMarks;

  const openReportModal = (question) => {
    setReportQuestion(question);
    setReportReason("");
    setReportDescription("");
  };

  const closeReportModal = () => {
    setReportQuestion(null);
    setReportReason("");
    setReportDescription("");
  };

  const submitReport = () => {
    if (!reportReason) return;

    const reportData = {
      questionId: reportQuestion.id,
      question: reportQuestion.question,
      reason: reportReason,
      description: reportDescription.trim(),
    };

    /*
      Backend API yahan call kar sakta hai:

      await fetch("/api/assessment/report-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });
    */

    console.log("Question Report:", reportData);

    setReportedQuestions((prev) => ({
      ...prev,
      [reportQuestion.id]: true,
    }));

    closeReportModal();
  };

  return (
    <div className="min-h-screen bg-[#080d13] text-white">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0b1119]/95 backdrop-blur-xl">

        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/10 text-cyan-400">
              <ShieldCheck size={20} />
            </div>

            <div>
              <h1 className="text-sm font-bold text-white sm:text-base">
                Assessment Result
              </h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                VeStaff Candidate Portal
              </p>
            </div>

          </div>

          <div
            className={`
              flex items-center gap-2 rounded-full border px-3 py-1.5
              text-xs font-bold
              ${
                passed
                  ? "border-emerald-400/15 bg-emerald-400/10 text-emerald-400"
                  : "border-red-400/15 bg-red-400/10 text-red-400"
              }
            `}
          >
            {passed ? (
              <CheckCircle2 size={14} />
            ) : (
              <XCircle size={14} />
            )}

            {passed ? "Passed" : "Failed"}
          </div>

        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">

        {/* Background glow */}
        <div className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/[0.025] blur-[120px]" />

        {/* =================================================
            SCORE
        ================================================== */}

        <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d141e] shadow-[0_10px_40px_rgba(0,0,0,0.18)]">

          <div className="p-6 sm:p-8">

            <div className="text-center">

              <div
                className={`
                  mx-auto inline-flex items-center gap-2
                  rounded-full border px-3 py-1.5
                  text-[10px] font-bold uppercase tracking-[0.16em]
                  ${
                    passed
                      ? "border-emerald-400/15 bg-emerald-400/10 text-emerald-400"
                      : "border-red-400/15 bg-red-400/10 text-red-400"
                  }
                `}
              >
                {passed ? (
                  <CheckCircle2 size={14} />
                ) : (
                  <XCircle size={14} />
                )}

                {passed ? "Assessment Passed" : "Assessment Failed"}
              </div>

              <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                {result.assessmentName}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Your assessment has been evaluated successfully.
              </p>

              <div className="mt-6">

                <div
                  className={`
                    text-5xl font-black tracking-tight sm:text-6xl
                    ${passed ? "text-cyan-300" : "text-red-400"}
                  `}
                >
                  {percentage}%
                </div>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Overall Score
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  {result.obtainedMarks} / {result.totalMarks} Marks
                </p>

              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">

              <ResultStat
                label="Total Questions"
                value={result.totalQuestions}
              />

              <ResultStat
                label="Correct"
                value={result.correct}
                variant="green"
              />

              <ResultStat
                label="Wrong"
                value={result.wrong}
                variant="red"
              />

              <ResultStat
                label="Skipped"
                value={result.skipped}
                variant="yellow"
              />

            </div>

          </div>
        </section>

        {/* =================================================
            QUESTIONS
        ================================================== */}

        <section className="mt-8">

          <div className="mb-5">

            <h3 className="text-xl font-bold text-white">
              Question Review
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Review your answers and report any issue with a question.
            </p>

          </div>

          <div className="space-y-5">

            {result.questions.map((question) => {

              const isSkipped = !question.selectedAnswer;

              const isCorrect =
                !isSkipped &&
                question.selectedAnswer ===
                  question.correctAnswer;

              return (
                <QuestionResult
                  key={question.id}
                  question={question}
                  isCorrect={isCorrect}
                  isSkipped={isSkipped}
                  isReported={!!reportedQuestions[question.id]}
                  onReport={() =>
                    openReportModal(question)
                  }
                />
              );
            })}

          </div>
        </section>

        {/* Back */}
        <div className="flex justify-center py-8">

          <Link
            href="/"
            className="
              flex items-center justify-center gap-2
              rounded-xl border border-white/[0.08]
              bg-[#0d141e] px-6 py-3
              text-sm font-semibold text-slate-300
              shadow-sm transition-all
              hover:border-white/[0.15]
              hover:bg-[#111a25]
            "
          >
            <ArrowLeft size={17} />
            Back to Assessments
          </Link>

        </div>
      </main>

      {/* =====================================================
          REPORT MODAL
      ====================================================== */}

      {reportQuestion && (
        <div
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            bg-black/70 p-4
            backdrop-blur-sm
          "
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeReportModal();
            }
          }}
        >

          <div
            className="
              w-full max-w-lg
              overflow-hidden rounded-2xl
              border border-white/[0.08]
              bg-[#0d141e]
              shadow-[0_25px_80px_rgba(0,0,0,0.45)]
            "
          >

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/[0.06] p-5 sm:p-6">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-400/15 bg-red-400/10 text-red-400">
                  <Flag size={18} />
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">
                    Report Question
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Tell us what is wrong with this question.
                  </p>
                </div>

              </div>

              <button
                onClick={closeReportModal}
                className="
                  flex h-8 w-8 items-center
                  justify-center rounded-lg
                  text-slate-500
                  transition-colors
                  hover:bg-white/[0.05]
                  hover:text-white
                "
              >
                <X size={18} />
              </button>

            </div>

            {/* Modal Body */}
            <div className="space-y-5 p-5 sm:p-6">

              {/* Question Preview */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">

                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-md bg-cyan-400/10 px-2 py-1 text-[10px] font-bold text-cyan-400">
                    Q{reportQuestion.id}
                  </span>

                  <span className="text-[10px] uppercase tracking-wider text-slate-600">
                    Question
                  </span>
                </div>

                <p className="text-sm leading-6 text-slate-300">
                  {reportQuestion.question}
                </p>

              </div>

              {/* Reason */}
              <div>

                <label className="mb-2 block text-xs font-semibold text-slate-300">
                  Reason for reporting
                  <span className="ml-1 text-red-400">
                    *
                  </span>
                </label>

                <select
                  value={reportReason}
                  onChange={(e) =>
                    setReportReason(e.target.value)
                  }
                  className="
                    w-full rounded-xl
                    border border-white/[0.08]
                    bg-[#111a25]
                    px-3.5 py-3
                    text-sm text-slate-300
                    outline-none
                    transition-all
                    focus:border-cyan-400/40
                    focus:ring-2
                    focus:ring-cyan-400/10
                  "
                >
                  <option value="">
                    Select a reason
                  </option>

                  {reportReasons.map((reason) => (
                    <option
                      key={reason}
                      value={reason}
                    >
                      {reason}
                    </option>
                  ))}
                </select>

              </div>

              {/* Description */}
              <div>

                <label className="mb-2 block text-xs font-semibold text-slate-300">
                  Additional details
                  <span className="ml-1 font-normal text-slate-600">
                    (optional)
                  </span>
                </label>

                <textarea
                  value={reportDescription}
                  onChange={(e) =>
                    setReportDescription(e.target.value)
                  }
                  rows={4}
                  maxLength={500}
                  placeholder="Describe the issue with this question..."
                  className="
                    w-full resize-none rounded-xl
                    border border-white/[0.08]
                    bg-[#111a25]
                    px-3.5 py-3
                    text-sm text-slate-300
                    placeholder:text-slate-600
                    outline-none
                    transition-all
                    focus:border-cyan-400/40
                    focus:ring-2
                    focus:ring-cyan-400/10
                  "
                />

                <div className="mt-1 text-right text-[10px] text-slate-600">
                  {reportDescription.length}/500
                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex flex-col-reverse gap-2 border-t border-white/[0.06] p-5 sm:flex-row sm:justify-end sm:p-6">

              <button
                onClick={closeReportModal}
                className="
                  rounded-xl border border-white/[0.08]
                  bg-white/[0.03]
                  px-5 py-2.5
                  text-sm font-semibold
                  text-slate-400
                  transition-all
                  hover:bg-white/[0.06]
                  hover:text-slate-200
                "
              >
                Cancel
              </button>

              <button
                onClick={submitReport}
                disabled={!reportReason}
                className="
                  flex items-center justify-center gap-2
                  rounded-xl
                  bg-cyan-400
                  px-5 py-2.5
                  text-sm font-bold
                  text-[#061016]
                  transition-all
                  hover:bg-cyan-300
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <Flag size={15} />
                Submit Report
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   QUESTION RESULT
========================================================= */

function QuestionResult({
  question,
  isCorrect,
  isSkipped,
  isReported,
  onReport,
}) {
  return (
    <div
      className={`
        overflow-hidden rounded-2xl border
        bg-[#0d141e]
        shadow-[0_5px_25px_rgba(0,0,0,0.12)]
        ${
          isCorrect
            ? "border-emerald-400/15"
            : isSkipped
            ? "border-yellow-400/15"
            : "border-red-400/15"
        }
      `}
    >

      {/* Question Header */}
      <div className="flex items-start gap-3 border-b border-white/[0.06] p-5 sm:p-6">

        <div
          className={`
            flex h-9 w-9 shrink-0 items-center
            justify-center rounded-lg
            text-xs font-bold
            ${
              isCorrect
                ? "bg-emerald-400/10 text-emerald-400"
                : isSkipped
                ? "bg-yellow-400/10 text-yellow-400"
                : "bg-red-400/10 text-red-400"
            }
          `}
        >
          {question.id}
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

            <h4 className="text-sm font-semibold leading-6 text-slate-200 sm:text-base">
              {question.question}
            </h4>

            {/* Report */}
            <button
              onClick={onReport}
              disabled={isReported}
              className={`
                flex shrink-0 items-center justify-center gap-1.5
                self-start rounded-lg border px-2.5 py-1.5
                text-[10px] font-semibold
                transition-all
                ${
                  isReported
                    ? "cursor-default border-emerald-400/10 bg-emerald-400/[0.05] text-emerald-500"
                    : "border-white/[0.07] bg-white/[0.02] text-slate-500 hover:border-red-400/20 hover:bg-red-400/[0.06] hover:text-red-400"
                }
              `}
            >
              {isReported ? (
                <>
                  <Check size={13} />
                  Reported
                </>
              ) : (
                <>
                  <Flag size={13} />
                  Report Question
                </>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* =================================================
          ALL OPTIONS
      ================================================== */}

      <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">

        {question.options.map((option, index) => {

          const isSelected =
            question.selectedAnswer === option;

          const isAnswer =
            question.correctAnswer === option;

          let optionStyle =
            "border-white/[0.07] bg-[#111a25] text-slate-400";

          let badgeStyle =
            "border-white/[0.08] bg-white/[0.03] text-slate-500";

          if (isAnswer) {
            optionStyle =
              "border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-200";

            badgeStyle =
              "border-emerald-400/25 bg-emerald-400/10 text-emerald-400";
          }

          if (isSelected && !isAnswer) {
            optionStyle =
              "border-red-400/25 bg-red-400/[0.07] text-red-200";

            badgeStyle =
              "border-red-400/25 bg-red-400/10 text-red-400";
          }

          return (
            <div
              key={option}
              className={`
                flex min-w-0 items-center gap-3
                rounded-xl border p-3.5
                sm:p-4
                ${optionStyle}
              `}
            >

              <span
                className={`
                  flex h-9 w-9 shrink-0 items-center
                  justify-center rounded-lg border
                  text-xs font-bold sm:h-10 sm:w-10
                  ${badgeStyle}
                `}
              >
                {String.fromCharCode(65 + index)}
              </span>

              <span className="min-w-0 flex-1 break-all text-sm font-medium leading-6">
                {option}
              </span>

              {isAnswer && (
                <div className="flex shrink-0 items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide text-emerald-400">
                  <Check size={15} />
                  Correct
                </div>
              )}

              {isSelected && !isAnswer && (
                <div className="flex shrink-0 items-center gap-1.5 text-[9px] font-bold uppercase tracking-wide text-red-400">
                  <X size={15} />
                  Your Answer
                </div>
              )}

            </div>
          );
        })}

      </div>

      {/* Footer */}
      <div
        className={`
          border-t px-5 py-3 text-xs font-semibold sm:px-6
          ${
            isCorrect
              ? "border-emerald-400/10 bg-emerald-400/[0.04] text-emerald-400"
              : isSkipped
              ? "border-yellow-400/10 bg-yellow-400/[0.04] text-yellow-400"
              : "border-red-400/10 bg-red-400/[0.04] text-red-400"
          }
        `}
      >
        {isCorrect
          ? "You selected the correct answer."
          : isSkipped
          ? "You did not answer this question."
          : "Your selected answer was incorrect."}
      </div>

    </div>
  );
}

/* =========================================================
   RESULT STAT
========================================================= */

function ResultStat({
  label,
  value,
  variant,
}) {
  const styles = {
    green:
      "border-emerald-400/10 bg-emerald-400/[0.04] text-emerald-400",

    red:
      "border-red-400/10 bg-red-400/[0.04] text-red-400",

    yellow:
      "border-yellow-400/10 bg-yellow-400/[0.04] text-yellow-400",

    default:
      "border-white/[0.06] bg-white/[0.02] text-white",
  };

  return (
    <div
      className={`
        rounded-xl border p-4 text-center
        ${styles[variant] || styles.default}
      `}
    >
      <p className="text-[10px] font-bold uppercase tracking-wider opacity-50">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>
    </div>
  );
}