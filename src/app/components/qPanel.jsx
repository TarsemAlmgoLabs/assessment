// "use client";

// import Link from "next/link";
// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   ArrowRight,
//   CheckCircle2,
//   Clock3,
//   Flag,
//   HelpCircle,
//   LayoutGrid,
//   Menu,
//   Moon,
//   Send,
//   ShieldCheck,
//   Sun,
//   X,
// } from "lucide-react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useQportal } from "../context/qportal.context";

// export default function CBTExam() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [isAnotherTabOpen, setIsAnotherTabOpen] = useState(false);
//   const title = searchParams.get("title");
//   const exp = searchParams.get("exp");
//   const skills = searchParams.get("skills")?.split(",") || [];
//   const assessmentId = searchParams.get("assessmentId");

//   const {
//     loading,
//     setLoading,
//     questions,
//     loadAssessment,
//   } = useQportal();

//   useEffect(() => {
//     loadAssessment(title, exp, skills, assessmentId);
//   }, []);

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [marked, setMarked] = useState({});
//   const [showPalette, setShowPalette] = useState(false);

//   // Question timer
//   const [timeRemaining, setTimeRemaining] = useState(0);

//   // dark | light
//   const [theme, setTheme] = useState("dark");

//   const isDark = theme === "dark";

//   const question = questions?.[currentQuestion];

//   const answeredCount = Object.keys(answers).length;
//   const markedCount = Object.keys(marked).length;

//   // ============================================================
//   // FORMAT TIMER
//   // ============================================================

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;

//     return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
//       2,
//       "0"
//     )}`;
//   };

//   // ============================================================
//   // QUESTION TIMER
//   // ============================================================

//   useEffect(() => {
//   if (!question) return;

//   const duration = Number(question?.time) || 60;

//   // Start timer for current question
//   setTimeRemaining(duration);

//   let remaining = duration;

//   const timer = setInterval(() => {
//     remaining -= 1;

//     setTimeRemaining(remaining);

//     // Timer finished
//     if (remaining <= 0) {
//       clearInterval(timer);

//       // Last question
//       if (currentQuestion >= questions.length - 1) {
//         router.push("/results");
//         return;
//       }

//       // Move ONLY ONE question forward
//       setCurrentQuestion((prev) => prev + 1);
//     }
//   }, 1000);

//   return () => {
//     clearInterval(timer);
//   };
// }, [currentQuestion, question, questions.length, router]);

// useEffect(() => {
//   if (!assessmentId) return;

//   const LOCK_KEY = `cbt-assessment-active-${assessmentId}`;
//   const TAB_ID = `${Date.now()}-${Math.random()}`;

//   const LOCK_TIMEOUT = 5000;

//   const channel = new BroadcastChannel(
//     `cbt-assessment-${assessmentId}`
//   );

//   let isOwner = false;

//   const createLock = () => {
//     localStorage.setItem(
//       LOCK_KEY,
//       JSON.stringify({
//         tabId: TAB_ID,
//         lastSeen: Date.now(),
//       })
//     );

//     isOwner = true;
//   };

//   const getLock = () => {
//     const data = localStorage.getItem(LOCK_KEY);

//     if (!data) return null;

//     try {
//       return JSON.parse(data);
//     } catch {
//       return null;
//     }
//   };

//   const existingLock = getLock();

//   // ---------------------------------------------
//   // Existing active tab check
//   // ---------------------------------------------

//   if (existingLock) {
//     const isLockAlive =
//       Date.now() - existingLock.lastSeen < LOCK_TIMEOUT;

//     if (
//       isLockAlive &&
//       existingLock.tabId !== TAB_ID
//     ) {
//       setIsAnotherTabOpen(true);

//       channel.postMessage({
//         type: "TAB_ALREADY_OPEN",
//       });
//     } else {
//       createLock();
//     }
//   } else {
//     createLock();
//   }

//   // ---------------------------------------------
//   // Another tab asks who owns assessment
//   // ---------------------------------------------

//   channel.onmessage = (event) => {
//     if (event.data?.type === "WHO_IS_ACTIVE") {
//       if (isOwner) {
//         channel.postMessage({
//           type: "TAB_ALREADY_OPEN",
//         });
//       }
//     }

//     if (event.data?.type === "TAB_ALREADY_OPEN") {
//       if (!isOwner) {
//         setIsAnotherTabOpen(true);
//       }
//     }
//   };

//   // ---------------------------------------------
//   // Announce this tab
//   // ---------------------------------------------

//   channel.postMessage({
//     type: "WHO_IS_ACTIVE",
//   });

//   // ---------------------------------------------
//   // Heartbeat
//   // ---------------------------------------------

//   const heartbeat = setInterval(() => {
//     if (!isOwner) return;

//     localStorage.setItem(
//       LOCK_KEY,
//       JSON.stringify({
//         tabId: TAB_ID,
//         lastSeen: Date.now(),
//       })
//     );
//   }, 2000);

//   // ---------------------------------------------
//   // Cleanup
//   // ---------------------------------------------

//   return () => {
//     clearInterval(heartbeat);
//     channel.close();

//     const currentLock = getLock();

//     if (
//       currentLock &&
//       currentLock.tabId === TAB_ID
//     ) {
//       localStorage.removeItem(LOCK_KEY);
//     }
//   };
// }, [assessmentId]);

//   // ============================================================
//   // SELECT ANSWER
//   // ============================================================

//   const selectAnswer = (optionIndex) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [question?.id]: optionIndex,
//     }));
//   };

//   // ============================================================
//   // GO TO QUESTION
//   // Previous questions are locked
//   // ============================================================

//   const goToQuestion = (index) => {
//     // Cannot go back to already passed questions
//     if (index < currentQuestion) {
//       return;
//     }

//     setCurrentQuestion(index);

//     // Close mobile drawer after selection
//     if (window.innerWidth < 768) {
//       setShowPalette(false);
//     }
//   };

//   // ============================================================
//   // NEXT QUESTION
//   // ============================================================

//   const nextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion((prev) => prev + 1);
//     } else {
//       router.push("/results");
//     }

//     console.log(answers);
//   };

//   // ============================================================
//   // PREVIOUS QUESTION
//   // Back navigation is disabled permanently
//   // ============================================================

//   const previousQuestion = () => {
//     return;
//   };

//   // ============================================================
//   // TOGGLE MARK
//   // ============================================================

//   const toggleMark = () => {
//     setMarked((prev) => ({
//       ...prev,
//       [question.id]: !prev[question.id],
//     }));
//   };

//   // ============================================================
//   // QUESTION STATUS
//   // ============================================================

//   const getQuestionStatus = (index) => {
//     const id = questions[index].id;

//     if (marked[id]) return "marked";
//     if (answers[id] !== undefined) return "answered";

//     return "unanswered";
//   };

//   // ============================================================
//   // LOADING
//   // ============================================================

//   if (loading || !questions?.length) {
//     return (
//       <div className="flex h-dvh items-center justify-center bg-[#080d13] text-white">
//         <div className="flex flex-col items-center gap-4">
//           <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-400" />

//           <p className="text-sm text-slate-400">
//             Loading assessment...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (isAnotherTabOpen) {
//   return (
//     <div className="flex h-dvh items-center justify-center bg-[#080d13] px-5 text-white">
//       <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#0d141e] p-8 text-center shadow-2xl">

//         <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-400/10 text-3xl">
//           ⚠️
//         </div>

//         <h1 className="text-xl font-bold text-white">
//           Assessment Already Open
//         </h1>

//         <p className="mt-3 text-sm leading-6 text-slate-400">
//           This assessment is already open in another browser tab.
//           You cannot attempt the same assessment from multiple
//           tabs at the same time.
//         </p>

//         <div className="mt-6 rounded-xl border border-white/5 bg-white/5 p-4 text-left">
//           <p className="text-xs font-semibold text-slate-300">
//             What should you do?
//           </p>

//           <p className="mt-2 text-xs leading-5 text-slate-500">
//             Please return to the tab where your assessment is
//             currently running and continue your test there.
//           </p>
//         </div>

//         <button
//           onClick={() => window.close()}
//           className="
//             mt-6 w-full rounded-xl bg-cyan-400
//             px-5 py-3 text-sm font-bold
//             text-[#061016]
//             transition-all
//             hover:bg-cyan-300
//           "
//         >
//           Close This Tab
//         </button>

//       </div>
//     </div>
//   );
// }

//   return (
    
//     <div
//       className={`
//         relative h-dvh overflow-hidden transition-colors duration-300
//         ${
//           isDark
//             ? "bg-[#080d13] text-white"
//             : "bg-slate-100 text-slate-900"
//         }
//       `}
//     >
//       {/* =====================================================
//           BACKGROUND GRID
//       ====================================================== */}

//       <div
//         className={`
//           pointer-events-none absolute inset-0
//           ${isDark ? "opacity-30" : "opacity-40"}
//         `}
//         style={{
//           backgroundImage: isDark
//             ? `
//               linear-gradient(rgba(34,211,238,0.055) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(34,211,238,0.055) 1px, transparent 1px)
//             `
//             : `
//               linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px),
//               linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px)
//             `,
//           backgroundSize: "42px 42px",
//         }}
//       />

//       {/* =====================================================
//           TOP HEADER
//       ====================================================== */}

//       <header
//         className={`
//           relative z-50 h-[68px] shrink-0
//           border-b backdrop-blur-xl
//           ${
//             isDark
//               ? "border-cyan-500/15 bg-[#0b1119]/95"
//               : "border-slate-200 bg-white/95"
//           }
//         `}
//       >
//         <div className="flex h-full items-center justify-between px-3 sm:px-5 lg:px-8">

//           {/* Logo / Exam */}

//           <div className="flex min-w-0 items-center gap-2.5 sm:gap-4">

//             <div
//               className={`
//                 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
//                 border sm:h-10 sm:w-10 sm:rounded-xl
//                 ${
//                   isDark
//                     ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-400"
//                     : "border-cyan-200 bg-cyan-50 text-cyan-600"
//                 }
//               `}
//             >
//               <ShieldCheck size={19} />
//             </div>

//             <div className="min-w-0">
//               <h1
//                 className={`
//                   truncate text-xs font-bold sm:text-sm lg:text-base
//                   ${isDark ? "text-white" : "text-slate-900"}
//                 `}
//               >
//                 JavaScript Skill Assessment
//               </h1>

//               <p
//                 className={`
//                   hidden text-[11px] sm:block
//                   ${isDark ? "text-slate-500" : "text-slate-500"}
//                 `}
//               >
//                 VeStaff Candidate Assessment
//               </p>
//             </div>
//           </div>

//           {/* Desktop Progress + Timer */}

//           <div className="hidden items-center gap-4 md:flex lg:gap-6">

//             <div className="text-right">
//               <p
//                 className={`text-[10px] uppercase tracking-wider ${
//                   isDark ? "text-slate-500" : "text-slate-400"
//                 }`}
//               >
//                 Progress
//               </p>

//               <p
//                 className={`text-sm font-bold ${
//                   isDark ? "text-white" : "text-slate-900"
//                 }`}
//               >
//                 {answeredCount} / {questions.length}
//               </p>
//             </div>

//             <div
//               className={`h-8 w-px ${
//                 isDark ? "bg-white/10" : "bg-slate-200"
//               }`}
//             />

//             {/* Timer */}

//             <div
//               className={`
//                 flex items-center gap-3 rounded-xl border px-3 py-1.5 lg:px-4 lg:py-2
//                 ${
//                   timeRemaining <= 10
//                     ? isDark
//                       ? "border-red-400/30 bg-red-400/5"
//                       : "border-red-200 bg-red-50"
//                     : isDark
//                     ? "border-cyan-400/20 bg-cyan-400/5"
//                     : "border-cyan-200 bg-cyan-50"
//                 }
//               `}
//             >
//               <Clock3
//                 size={17}
//                 className={
//                   timeRemaining <= 10
//                     ? "text-red-400"
//                     : isDark
//                     ? "text-cyan-400"
//                     : "text-cyan-600"
//                 }
//               />

//               <div>
//                 <p
//                   className={`text-[9px] uppercase tracking-wider ${
//                     isDark ? "text-slate-500" : "text-slate-400"
//                   }`}
//                 >
//                   Time Remaining
//                 </p>

//                 <p
//                   className={`font-mono text-sm font-bold ${
//                     timeRemaining <= 10
//                       ? "text-red-400"
//                       : isDark
//                       ? "text-cyan-300"
//                       : "text-cyan-700"
//                   }`}
//                 >
//                   {formatTime(timeRemaining)}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Right */}

//           <div className="flex items-center gap-2 md:hidden">

//             {/* Mobile Timer */}

//             <div
//               className={`
//                 flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5
//                 ${
//                   timeRemaining <= 10
//                     ? isDark
//                       ? "border-red-400/30 bg-red-400/5"
//                       : "border-red-200 bg-red-50"
//                     : isDark
//                     ? "border-cyan-400/20 bg-cyan-400/5"
//                     : "border-cyan-200 bg-cyan-50"
//                 }
//               `}
//             >
//               <Clock3
//                 size={14}
//                 className={
//                   timeRemaining <= 10
//                     ? "text-red-400"
//                     : isDark
//                     ? "text-cyan-400"
//                     : "text-cyan-600"
//                 }
//               />

//               <span
//                 className={`font-mono text-xs font-bold ${
//                   timeRemaining <= 10
//                     ? "text-red-400"
//                     : isDark
//                     ? "text-cyan-300"
//                     : "text-cyan-700"
//                 }`}
//               >
//                 {formatTime(timeRemaining)}
//               </span>
//             </div>

//             {/* Palette Button */}

//             <button
//               onClick={() => setShowPalette(true)}
//               className={`
//                 flex h-9 w-9 items-center justify-center rounded-lg border cursor-pointer
//                 ${
//                   isDark
//                     ? "border-white/10 bg-white/5 text-slate-300"
//                     : "border-slate-200 bg-slate-50 text-slate-600"
//                 }
//               `}
//             >
//               <Menu size={18} />
//             </button>
//           </div>
//         </div>

//         {/* Progress */}

//         <div
//           className={`absolute bottom-0 left-0 h-[2px] w-full ${
//             isDark ? "bg-white/5" : "bg-slate-200"
//           }`}
//         >
//           <div
//             className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-500"
//             style={{
//               width: `${(answeredCount / questions.length) * 100}%`,
//             }}
//           />
//         </div>
//       </header>

//       {/* =====================================================
//           MAIN
//       ====================================================== */}

//       <main className="relative z-10 mx-auto flex h-[calc(100dvh-68px)] max-w-[1600px] gap-4 overflow-hidden p-3 sm:gap-5 sm:p-4 lg:gap-6 lg:p-6">

//         {/* ===================================================
//             MOBILE OVERLAY
//         ==================================================== */}

//         {showPalette && (
//           <div
//             onClick={() => setShowPalette(false)}
//             className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
//           />
//         )}

//         {/* ===================================================
//             QUESTION PALETTE
//         ==================================================== */}

//         <aside
//           className={`
//             fixed left-3 top-[80px] bottom-3 z-50 w-[280px]
//             transition-transform duration-300
//             md:relative md:left-auto md:top-auto md:bottom-auto
//             md:z-auto md:block md:w-[280px] md:translate-x-0
//             lg:w-[290px]
//             ${
//               showPalette
//                 ? "translate-x-0"
//                 : "-translate-x-[120%]"
//             }
//           `}
//         >
//           <div
//             className={`
//               flex h-full flex-col overflow-hidden rounded-2xl border shadow-xl
//               ${
//                 isDark
//                   ? "border-cyan-500/15 bg-[#0d141e]"
//                   : "border-slate-200 bg-white"
//               }
//             `}
//           >
//             {/* Palette Header */}

//             <div
//               className={`
//                 flex shrink-0 items-center justify-between border-b p-4 sm:p-5
//                 ${
//                   isDark
//                     ? "border-white/5"
//                     : "border-slate-100"
//                 }
//               `}
//             >
//               <div>
//                 <h2
//                   className={`text-sm font-bold sm:text-base ${
//                     isDark ? "text-white" : "text-slate-900"
//                   }`}
//                 >
//                   Question Palette
//                 </h2>

//                 <p
//                   className={`mt-1 text-[11px] ${
//                     isDark ? "text-slate-500" : "text-slate-400"
//                   }`}
//                 >
//                   Navigate between questions
//                 </p>
//               </div>

//               <div className="flex items-center gap-2">

//                 <LayoutGrid
//                   size={18}
//                   className={
//                     isDark
//                       ? "text-cyan-400"
//                       : "text-cyan-600"
//                   }
//                 />

//                 {/* Close mobile */}

//                 <button
//                   onClick={() => setShowPalette(false)}
//                   className="flex h-8 w-8 items-center justify-center rounded-lg md:hidden cursor-pointer"
//                 >
//                   <X
//                     size={17}
//                     className={
//                       isDark
//                         ? "text-slate-400"
//                         : "text-slate-500"
//                     }
//                   />
//                 </button>
//               </div>
//             </div>

//             {/* Legend */}

//             {/* <div
//               className={`
//                 grid shrink-0 grid-cols-2 gap-2 border-b p-3.5
//                 ${
//                   isDark
//                     ? "border-white/5"
//                     : "border-slate-100"
//                 }
//               `}
//             >
//               <div
//                 className={`flex items-center gap-2 text-[11px] ${
//                   isDark ? "text-slate-400" : "text-slate-500"
//                 }`}
//               >
//                 <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
//                 Answered
//               </div>

//               <div
//                 className={`flex items-center gap-2 text-[11px] ${
//                   isDark ? "text-slate-400" : "text-slate-500"
//                 }`}
//               >
//                 <span
//                   className={`h-2.5 w-2.5 rounded-full border ${
//                     isDark
//                       ? "border-slate-600 bg-slate-800"
//                       : "border-slate-300 bg-slate-100"
//                   }`}
//                 />
//                 Unanswered
//               </div>

//               <div
//                 className={`flex items-center gap-2 text-[11px] ${
//                   isDark ? "text-slate-400" : "text-slate-500"
//                 }`}
//               >
//                 <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
//                 Marked
//               </div>

//               <div
//                 className={`flex items-center gap-2 text-[11px] ${
//                   isDark ? "text-slate-400" : "text-slate-500"
//                 }`}
//               >
//                 <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
//                 Current
//               </div>
//             </div> */}

//             {/* Questions */}

//             <div className="flex-1 overflow-y-auto p-4">

//               <p
//                 className={`mb-3 text-[10px] font-bold uppercase tracking-wider ${
//                   isDark ? "text-slate-500" : "text-slate-400"
//                 }`}
//               >
//                 Questions
//               </p>

//               <div className="grid grid-cols-5 gap-2">

//                 {questions.map((item, index) => {
//                   const status = getQuestionStatus(index);
//                   const isCurrent = index === currentQuestion;
//                   const isLocked = index < currentQuestion;

//                   let styles = isDark
//                     ? "border-white/10 bg-[#121b27] text-slate-400"
//                     : "border-slate-200 bg-slate-50 text-slate-500";

//                   if (status === "answered") {
//                     styles = isDark
//                       ? "border-cyan-400/30 bg-cyan-400/15 text-cyan-300"
//                       : "border-cyan-300 bg-cyan-50 text-cyan-700";
//                   }

//                   if (status === "marked") {
//                     styles = isDark
//                       ? "border-yellow-400/30 bg-yellow-400/15 text-yellow-300"
//                       : "border-yellow-300 bg-yellow-50 text-yellow-700";
//                   }

//                   if (isCurrent) {
//                     styles = isDark
//                       ? "border-emerald-400/60 bg-emerald-400/20 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.15)]"
//                       : "border-emerald-400 bg-emerald-50 text-emerald-700 shadow-sm";
//                   }

//                   if (isLocked) {
//                     styles = isDark
//                       ? "border-white/5 bg-[#0c131d] text-slate-600"
//                       : "border-slate-200 bg-slate-100 text-slate-400";
//                   }

//                   return (
//                     <button
//                       key={item.id}
//                       onClick={() => goToQuestion(index)}
//                       disabled={isLocked}
//                       className={`
//                         relative flex h-9 items-center justify-center
//                         rounded-lg border text-xs font-bold
//                         transition-all duration-200
//                         ${
//                           isLocked
//                             ? "cursor-not-allowed opacity-70"
//                             : "hover:-translate-y-[1px] cursor-pointer"
//                         }
//                         ${styles}
//                       `}
//                     >
//                       {item.id}

//                       {status === "marked" && !isLocked && (
//                         <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-yellow-400" />
//                       )}

//                       {isLocked && (
//                         <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-slate-600" />
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Summary */}

//             <div
//               className={`
//                 shrink-0 border-t p-4
//                 ${
//                   isDark
//                     ? "border-white/5"
//                     : "border-slate-100"
//                 }
//               `}
//             >
//               <div className="mb-2 flex justify-between text-[11px]">
//                 <span
//                   className={
//                     isDark ? "text-slate-500" : "text-slate-400"
//                   }
//                 >
//                   Attempted
//                 </span>

//                 <span
//                   className={`font-semibold ${
//                     isDark ? "text-cyan-400" : "text-cyan-600"
//                   }`}
//                 >
//                   {answeredCount}/{questions.length}
//                 </span>
//               </div>

//               <div
//                 className={`h-1.5 overflow-hidden rounded-full ${
//                   isDark ? "bg-white/5" : "bg-slate-100"
//                 }`}
//               >
//                 <div
//                   className="h-full rounded-full bg-cyan-400 transition-all"
//                   style={{
//                     width: `${
//                       (answeredCount / questions.length) * 100
//                     }%`,
//                   }}
//                 />
//               </div>

//               <div
//                 className={`mt-3 flex justify-between text-[11px] ${
//                   isDark ? "text-slate-500" : "text-slate-400"
//                 }`}
//               >
//                 <span>
//                   Marked:{" "}
//                   <span className="text-yellow-500">
//                     {markedCount}
//                   </span>
//                 </span>

//                 <span>
//                   Remaining:{" "}
//                   <span
//                     className={
//                       isDark ? "text-white" : "text-slate-700"
//                     }
//                   >
//                     {questions.length - answeredCount}
//                   </span>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </aside>

//         {/* ===================================================
//             QUESTION AREA
//         ==================================================== */}

//         <section className="min-w-0 flex-1">

//           <div
//             className={`
//               flex h-full flex-col overflow-hidden rounded-2xl border shadow-xl
//               ${
//                 isDark
//                   ? "border-cyan-500/15 bg-[#0d141e]"
//                   : "border-slate-200 bg-white"
//               }
//             `}
//           >

//             {/* Question Header */}

//             <div
//               className={`
//                 flex shrink-0 items-center justify-between gap-3
//                 border-b px-4 py-3 sm:px-6 sm:py-4
//                 ${
//                   isDark
//                     ? "border-white/5"
//                     : "border-slate-100"
//                 }
//               `}
//             >

//               <div className="flex items-center gap-2.5 sm:gap-3">

//                 <div
//                   className={`
//                     flex h-9 w-9 items-center justify-center rounded-lg
//                     text-sm font-bold sm:h-10 sm:w-10
//                     ${
//                       isDark
//                         ? "bg-cyan-400/10 text-cyan-400"
//                         : "bg-cyan-50 text-cyan-600"
//                     }
//                   `}
//                 >
//                   {question?.id}
//                 </div>

//                 <div>
//                   <p
//                     className={`text-[10px] uppercase tracking-wider ${
//                       isDark ? "text-slate-500" : "text-slate-400"
//                     }`}
//                   >
//                     Question
//                   </p>

//                   <p
//                     className={`text-xs font-semibold sm:text-sm ${
//                       isDark ? "text-white" : "text-slate-900"
//                     }`}
//                   >
//                     {question?.id} of {questions.length}
//                   </p>
//                 </div>
//               </div>

//               {/* Mark button intentionally kept commented */}

//               {/* 
//               <button
//                 onClick={toggleMark}
//                 className={`
//                   flex items-center gap-1.5 rounded-lg border
//                   px-2.5 py-2 text-[11px] font-semibold
//                   sm:px-4 sm:text-xs
//                   ${
//                     marked[question.id]
//                       ? isDark
//                         ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"
//                         : "border-yellow-300 bg-yellow-50 text-yellow-700"
//                       : isDark
//                       ? "border-white/10 bg-white/5 text-slate-400 hover:border-yellow-400/30 hover:text-yellow-300"
//                       : "border-slate-200 bg-slate-50 text-slate-500 hover:border-yellow-300 hover:text-yellow-600"
//                   }
//                 `}
//               >
//                 <Flag size={14} />

//                 <span className="hidden xs:inline sm:inline">
//                   {marked[question.id]
//                     ? "Marked"
//                     : "Mark for Review"}
//                 </span>
//               </button>
//               */}
//             </div>

//             {/* Question Content */}

//             <div className="flex-1 overflow-y-auto">

//               <div className="p-5 sm:p-7 lg:p-10">

//                 <div className="max-w-4xl">

//                   <span
//                     className={`text-[10px] font-bold uppercase tracking-[0.18em] sm:text-xs ${
//                       isDark ? "text-cyan-400" : "text-cyan-600"
//                     }`}
//                   >
//                     Multiple Choice Question
//                   </span>

//                   <h2
//                     className={`
//                       mt-4 text-lg font-semibold leading-7
//                       sm:mt-5 sm:text-xl sm:leading-8
//                       lg:text-2xl
//                       ${
//                         isDark
//                           ? "text-white"
//                           : "text-slate-900"
//                       }
//                     `}
//                   >
//                     {question?.question}
//                   </h2>
//                 </div>

//                 {/* Code Snippet */}

//                 <div className="w-full mt-4 overflow-x-auto rounded-xl border border-gray-800 bg-[#0d1117] p-5">
//                   <pre className="m-0 whitespace-pre-wrap break-words font-mono text-sm leading-6 text-gray-300">
//                     {question?.codeSnippet}
//                   </pre>
//                 </div>

//                 {/* Options */}

//                 <div className="mt-7 grid w-full max-w-5xl grid-cols-2 gap-3 sm:mt-9 sm:gap-4">

//                   {question?.options.map((option, index) => {
//                     const isSelected =
//                       answers[question.id] === index;

//                     return (
//                       <button
//                         key={option}
//                         onClick={() => selectAnswer(index)}
//                         className={`
//                           group flex min-w-0 w-full items-center gap-2
//                           overflow-hidden rounded-xl border p-3 text-left
//                           transition-all duration-200
//                           sm:gap-4 sm:p-4 cursor-pointer
//                           ${
//                             isSelected
//                               ? isDark
//                                 ? "border-cyan-400/60 bg-cyan-400/10 shadow-[0_0_25px_rgba(34,211,238,0.08)]"
//                                 : "border-cyan-400 bg-cyan-50 shadow-sm"
//                               : isDark
//                               ? "border-white/10 bg-[#111a25] hover:border-cyan-400/30 hover:bg-cyan-400/5"
//                               : "border-slate-200 bg-slate-50 hover:border-cyan-300 hover:bg-cyan-50/50"
//                           }
//                         `}
//                       >

//                         {/* Letter */}

//                         <span
//                           className={`
//                             flex h-9 w-9 shrink-0 items-center justify-center
//                             rounded-lg border text-xs font-bold
//                             sm:h-10 sm:w-10 sm:text-sm
//                             ${
//                               isSelected
//                                 ? isDark
//                                   ? "border-cyan-400 bg-cyan-400 text-[#071118]"
//                                   : "border-cyan-500 bg-cyan-500 text-white"
//                                 : isDark
//                                 ? "border-white/10 bg-white/5 text-slate-400 group-hover:border-cyan-400/30 group-hover:text-cyan-300"
//                                 : "border-slate-200 bg-white text-slate-500 group-hover:border-cyan-300 group-hover:text-cyan-600"
//                             }
//                           `}
//                         >
//                           {String.fromCharCode(65 + index)}
//                         </span>

//                         {/* Text */}

//                         <span
//                           className={`
//                             min-w-0 flex-1 break-all
//                             text-sm leading-5 sm:text-sm sm:leading-6
//                             ${
//                               isSelected
//                                 ? isDark
//                                   ? "font-semibold text-cyan-100"
//                                   : "font-semibold text-cyan-800"
//                                 : isDark
//                                 ? "text-slate-300"
//                                 : "text-slate-700"
//                             }
//                           `}
//                         >
//                           {option}
//                         </span>

//                         {/* Selected */}

//                         {isSelected && (
//                           <CheckCircle2
//                             size={19}
//                             className={`ml-auto shrink-0 ${
//                               isDark
//                                 ? "text-cyan-400"
//                                 : "text-cyan-600"
//                             }`}
//                           />
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>

//             {/* =================================================
//                 BOTTOM NAVIGATION
//             ================================================== */}

//             <div
//               className={`
//                 flex shrink-0 flex-col gap-2.5
//                 border-t px-4 py-3
//                 sm:flex-row sm:items-center sm:justify-between
//                 sm:px-6 sm:py-4
//                 ${
//                   isDark
//                     ? "border-white/5 bg-[#0a1119]"
//                     : "border-slate-100 bg-slate-50"
//                 }
//               `}
//             >

//               {/* Previous */}

//               <button
//                 onClick={previousQuestion}
//                 disabled={true}
//                 className={`
//                   flex items-center justify-center gap-2 rounded-xl
//                   border px-4 py-2.5 text-xs font-semibold
//                   sm:px-5 sm:py-3 sm:text-sm
//                   ${
//                     isDark
//                       ? "border-white/10 bg-white/5 text-slate-300"
//                       : "border-slate-200 bg-white text-slate-600"
//                   }
//                   cursor-not-allowed opacity-30
//                 `}
//               >
//                 <ArrowLeft size={16} />
//                 Previous
//               </button>

//               <div
//                 className={`hidden items-center justify-center gap-2 text-xs md:flex ${
//                   isDark ? "text-slate-500" : "text-slate-400"
//                 }`}
//               >
//                 <HelpCircle size={14} />

//                 <span>
//                   {timeRemaining > 0
//                     ? `Time remaining: ${formatTime(timeRemaining)}`
//                     : "Time is up"}
//                 </span>
//               </div>

//               {/* Last question */}

//               {currentQuestion === questions.length - 1 ? (
//                 <Link
//                   href={"/results"}
//                   className="
//                     flex items-center justify-center gap-2
//                     rounded-xl bg-cyan-400 px-5 py-2.5
//                     text-xs font-bold text-[#061016]
//                     shadow-[0_0_25px_rgba(34,211,238,0.2)]
//                     transition-all hover:bg-cyan-300
//                     sm:px-6 sm:py-3 sm:text-sm cursor-pointer
//                   "
//                 >
//                   <Send size={16} />
//                   Submit Assessment
//                 </Link>
//               ) : (
//                 <button
//                   onClick={nextQuestion}
//                   className="
//                     flex items-center justify-center gap-2
//                     rounded-xl bg-cyan-400 px-5 py-2.5
//                     text-xs font-bold text-[#061016]
//                     shadow-[0_0_25px_rgba(34,211,238,0.15)]
//                     transition-all hover:bg-cyan-300
//                     sm:px-6 sm:py-3 sm:text-sm
//                   "
//                 >
//                   Save & Next
//                   <ArrowRight size={16} />
//                 </button>
//               )}
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* =====================================================
//           THEME TOGGLE - BOTTOM
//       ====================================================== */}

//       <div
//         className={`
//           fixed left-1/2 z-[70]
//           -translate-x-1/2
//           bottom-2 sm:bottom-4
//           rounded-full border p-1
//           shadow-2xl backdrop-blur-xl
//           ${
//             isDark
//               ? "border-white/10 bg-[#111923]/95"
//               : "border-slate-200 bg-white/95"
//           }
//         `}
//       >
//         <div className="flex items-center gap-1">

//           {/* Dark */}

//           <button
//             onClick={() => setTheme("dark")}
//             className={`
//               flex items-center gap-1.5 rounded-full
//               px-3 py-1.5 text-[11px] font-semibold
//               transition-all
//               ${
//                 isDark
//                   ? "bg-cyan-400 text-[#071118] shadow-[0_0_15px_rgba(34,211,238,0.2)]"
//                   : "text-slate-500 hover:bg-slate-100"
//               }
//             `}
//           >
//             <Moon size={13} />
//             Dark
//           </button>

//           {/* Light */}

//           <button
//             onClick={() => setTheme("light")}
//             className={`
//               flex items-center gap-1.5 rounded-full
//               px-3 py-1.5 text-[11px] font-semibold
//               transition-all
//               ${
//                 !isDark
//                   ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]"
//                   : "text-slate-500 hover:bg-white/10"
//               }
//             `}
//           >
//             <Sun size={13} />
//             Light
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Flag,
  HelpCircle,
  LayoutGrid,
  Menu,
  Moon,
  Send,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQportal } from "../context/qportal.context";
import { useAntiCheat } from "../hooks/useAntiCheat";

export default function CBTExam() {
  useAntiCheat();
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isAnotherTabOpen, setIsAnotherTabOpen] = useState(false);
  const title = searchParams.get("title");
  const exp = searchParams.get("exp");
  const skills = searchParams.get("skills")?.split(",") || [];
  const assessmentId = searchParams.get("assessmentId");

  const {
    loading,
    setLoading,
    questions,
    loadAssessment,
  } = useQportal();

  useEffect(() => {
    loadAssessment(title, exp, skills, assessmentId);
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState({});
  const [showPalette, setShowPalette] = useState(false);

  // Question timer
  const [timeRemaining, setTimeRemaining] = useState(0);

  // dark | light
  const [theme, setTheme] = useState("dark");

  const isDark = theme === "dark";

  const question = questions?.[currentQuestion];

  const answeredCount = Object.keys(answers).length;
  const markedCount = Object.keys(marked).length;

  // ============================================================
  // FORMAT TIMER
  // ============================================================

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  // ============================================================
  // QUESTION TIMER
  // ============================================================

  useEffect(() => {
  if (!question) return;

  const duration = Number(question?.time) || 60;

  // Start timer for current question
  setTimeRemaining(duration);

  let remaining = duration;

  const timer = setInterval(() => {
    remaining -= 1;

    setTimeRemaining(remaining);

    // Timer finished
    if (remaining <= 0) {
      clearInterval(timer);

      // Last question
      if (currentQuestion >= questions.length - 1) {
        router.push("/results");
        return;
      }

      // Move ONLY ONE question forward
      setCurrentQuestion((prev) => prev + 1);
    }
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, [currentQuestion, question, questions.length, router]);

useEffect(() => {
  if (!assessmentId) return;

  const LOCK_KEY = `cbt-assessment-active-${assessmentId}`;
  const TAB_ID = `${Date.now()}-${Math.random()}`;

  const LOCK_TIMEOUT = 5000;

  const channel = new BroadcastChannel(
    `cbt-assessment-${assessmentId}`
  );

  let isOwner = false;

  const createLock = () => {
    localStorage.setItem(
      LOCK_KEY,
      JSON.stringify({
        tabId: TAB_ID,
        lastSeen: Date.now(),
      })
    );

    isOwner = true;
  };

  const getLock = () => {
    const data = localStorage.getItem(LOCK_KEY);

    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  };

  const existingLock = getLock();

  // ---------------------------------------------
  // Existing active tab check
  // ---------------------------------------------

  if (existingLock) {
    const isLockAlive =
      Date.now() - existingLock.lastSeen < LOCK_TIMEOUT;

    if (
      isLockAlive &&
      existingLock.tabId !== TAB_ID
    ) {
      setIsAnotherTabOpen(true);

      channel.postMessage({
        type: "TAB_ALREADY_OPEN",
      });
    } else {
      createLock();
    }
  } else {
    createLock();
  }

  // ---------------------------------------------
  // Another tab asks who owns assessment
  // ---------------------------------------------

  channel.onmessage = (event) => {
    if (event.data?.type === "WHO_IS_ACTIVE") {
      if (isOwner) {
        channel.postMessage({
          type: "TAB_ALREADY_OPEN",
        });
      }
    }

    if (event.data?.type === "TAB_ALREADY_OPEN") {
      if (!isOwner) {
        setIsAnotherTabOpen(true);
      }
    }
  };

  // ---------------------------------------------
  // Announce this tab
  // ---------------------------------------------

  channel.postMessage({
    type: "WHO_IS_ACTIVE",
  });

  // ---------------------------------------------
  // Heartbeat
  // ---------------------------------------------

  const heartbeat = setInterval(() => {
    if (!isOwner) return;

    localStorage.setItem(
      LOCK_KEY,
      JSON.stringify({
        tabId: TAB_ID,
        lastSeen: Date.now(),
      })
    );
  }, 2000);

  // ---------------------------------------------
  // Cleanup
  // ---------------------------------------------

  return () => {
    clearInterval(heartbeat);
    channel.close();

    const currentLock = getLock();

    if (
      currentLock &&
      currentLock.tabId === TAB_ID
    ) {
      localStorage.removeItem(LOCK_KEY);
    }
  };
}, [assessmentId]);

  // ============================================================
  // SELECT ANSWER
  // ============================================================

  const selectAnswer = (optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [question?.id]: optionIndex,
    }));
  };

  // ============================================================
  // GO TO QUESTION
  // Previous questions are locked
  // ============================================================

  const goToQuestion = (index) => {
    // Cannot go back to already passed questions
    if (index < currentQuestion) {
      return;
    }

    setCurrentQuestion(index);

    // Close mobile drawer after selection
    if (window.innerWidth < 768) {
      setShowPalette(false);
    }
  };

  // ============================================================
  // NEXT QUESTION
  // ============================================================

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      router.push("/results");
    }

    console.log(answers);
  };

  // ============================================================
  // PREVIOUS QUESTION
  // Back navigation is disabled permanently
  // ============================================================

  const previousQuestion = () => {
    return;
  };

  // ============================================================
  // TOGGLE MARK
  // ============================================================

  const toggleMark = () => {
    setMarked((prev) => ({
      ...prev,
      [question.id]: !prev[question.id],
    }));
  };

  // ============================================================
  // QUESTION STATUS
  // ============================================================

  const getQuestionStatus = (index) => {
    const id = questions[index].id;

    if (marked[id]) return "marked";
    if (answers[id] !== undefined) return "answered";

    return "unanswered";
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading || !questions?.length) {
    return (
      <div className="flex h-dvh items-center justify-center bg-[#080d13] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-400" />

          <p className="text-sm text-slate-400">
            Loading assessment...
          </p>
        </div>
      </div>
    );
  }

  if (isAnotherTabOpen) {
  return (
    <div className="flex h-dvh items-center justify-center bg-[#080d13] px-5 text-white">
      <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#0d141e] p-8 text-center shadow-2xl">

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-400/10 text-3xl">
          ⚠️
        </div>

        <h1 className="text-xl font-bold text-white">
          Assessment Already Open
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          This assessment is already open in another browser tab.
          You cannot attempt the same assessment from multiple
          tabs at the same time.
        </p>

        <div className="mt-6 rounded-xl border border-white/5 bg-white/5 p-4 text-left">
          <p className="text-xs font-semibold text-slate-300">
            What should you do?
          </p>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            Please return to the tab where your assessment is
            currently running and continue your test there.
          </p>
        </div>

        <button
          onClick={() => window.close()}
          className="
            mt-6 w-full rounded-xl bg-cyan-400
            px-5 py-3 text-sm font-bold
            text-[#061016]
            transition-all
            hover:bg-cyan-300
          "
        >
          Close This Tab
        </button>

      </div>
    </div>
  );
}

  return (
    
    <div
      className={`
        relative h-dvh overflow-hidden transition-colors duration-300
        ${
          isDark
            ? "bg-[#080d13] text-white"
            : "bg-slate-100 text-slate-900"
        }
      `}
    >
      {/* =====================================================
          BACKGROUND GRID
      ====================================================== */}

      <div
        className={`
          pointer-events-none absolute inset-0
          ${isDark ? "opacity-30" : "opacity-40"}
        `}
        style={{
          backgroundImage: isDark
            ? `
              linear-gradient(rgba(34,211,238,0.055) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,211,238,0.055) 1px, transparent 1px)
            `
            : `
              linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px)
            `,
          backgroundSize: "42px 42px",
        }}
      />

      {/* =====================================================
          TOP HEADER
      ====================================================== */}

      <header
        className={`
          relative z-50 h-[68px] shrink-0
          border-b backdrop-blur-xl
          ${
            isDark
              ? "border-cyan-500/15 bg-[#0b1119]/95"
              : "border-slate-200 bg-white/95"
          }
        `}
      >
        <div className="flex h-full items-center justify-between px-3 sm:px-5 lg:px-8">

          {/* Logo / Exam */}

          <div className="flex min-w-0 items-center gap-2.5 sm:gap-4">

            <div
              className={`
                flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                border sm:h-10 sm:w-10 sm:rounded-xl
                ${
                  isDark
                    ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-400"
                    : "border-cyan-200 bg-cyan-50 text-cyan-600"
                }
              `}
            >
              <ShieldCheck size={19} />
            </div>

            <div className="min-w-0">
              <h1
                className={`
                  truncate text-xs font-bold sm:text-sm lg:text-base
                  ${isDark ? "text-white" : "text-slate-900"}
                `}
              >
                JavaScript Skill Assessment
              </h1>

              <p
                className={`
                  hidden text-[11px] sm:block
                  ${isDark ? "text-slate-500" : "text-slate-500"}
                `}
              >
                VeStaff Candidate Assessment
              </p>
            </div>
          </div>

          {/* Desktop Progress + Timer */}

          <div className="hidden items-center gap-4 md:flex lg:gap-6">

            <div className="text-right">
              <p
                className={`text-[10px] uppercase tracking-wider ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Progress
              </p>

              <p
                className={`text-sm font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                {answeredCount} / {questions.length}
              </p>
            </div>

            <div
              className={`h-8 w-px ${
                isDark ? "bg-white/10" : "bg-slate-200"
              }`}
            />

            {/* Timer */}

            <div
              className={`
                flex items-center gap-3 rounded-xl border px-3 py-1.5 lg:px-4 lg:py-2
                ${
                  timeRemaining <= 10
                    ? isDark
                      ? "border-red-400/30 bg-red-400/5"
                      : "border-red-200 bg-red-50"
                    : isDark
                    ? "border-cyan-400/20 bg-cyan-400/5"
                    : "border-cyan-200 bg-cyan-50"
                }
              `}
            >
              <Clock3
                size={17}
                className={
                  timeRemaining <= 10
                    ? "text-red-400"
                    : isDark
                    ? "text-cyan-400"
                    : "text-cyan-600"
                }
              />

              <div>
                <p
                  className={`text-[9px] uppercase tracking-wider ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Time Remaining
                </p>

                <p
                  className={`font-mono text-sm font-bold ${
                    timeRemaining <= 10
                      ? "text-red-400"
                      : isDark
                      ? "text-cyan-300"
                      : "text-cyan-700"
                  }`}
                >
                  {formatTime(timeRemaining)}
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Right */}

          <div className="flex items-center gap-2 md:hidden">

            {/* Mobile Timer */}

            <div
              className={`
                flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5
                ${
                  timeRemaining <= 10
                    ? isDark
                      ? "border-red-400/30 bg-red-400/5"
                      : "border-red-200 bg-red-50"
                    : isDark
                    ? "border-cyan-400/20 bg-cyan-400/5"
                    : "border-cyan-200 bg-cyan-50"
                }
              `}
            >
              <Clock3
                size={14}
                className={
                  timeRemaining <= 10
                    ? "text-red-400"
                    : isDark
                    ? "text-cyan-400"
                    : "text-cyan-600"
                }
              />

              <span
                className={`font-mono text-xs font-bold ${
                  timeRemaining <= 10
                    ? "text-red-400"
                    : isDark
                    ? "text-cyan-300"
                    : "text-cyan-700"
                }`}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>

            {/* Palette Button */}

            <button
              onClick={() => setShowPalette(true)}
              className={`
                flex h-9 w-9 items-center justify-center rounded-lg border cursor-pointer
                ${
                  isDark
                    ? "border-white/10 bg-white/5 text-slate-300"
                    : "border-slate-200 bg-slate-50 text-slate-600"
                }
              `}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        {/* Progress */}

        <div
          className={`absolute bottom-0 left-0 h-[2px] w-full ${
            isDark ? "bg-white/5" : "bg-slate-200"
          }`}
        >
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-500"
            style={{
              width: `${(answeredCount / questions.length) * 100}%`,
            }}
          />
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="relative z-10 mx-auto flex h-[calc(100dvh-68px)] max-w-[1600px] gap-4 overflow-hidden p-3 sm:gap-5 sm:p-4 lg:gap-6 lg:p-6">

        {/* ===================================================
            MOBILE OVERLAY
        ==================================================== */}

        {showPalette && (
          <div
            onClick={() => setShowPalette(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}

        {/* ===================================================
            QUESTION PALETTE
        ==================================================== */}

        <aside
          className={`
            fixed left-3 top-[80px] bottom-3 z-50 w-[280px]
            transition-transform duration-300
            md:relative md:left-auto md:top-auto md:bottom-auto
            md:z-auto md:block md:w-[280px] md:translate-x-0
            lg:w-[290px]
            ${
              showPalette
                ? "translate-x-0"
                : "-translate-x-[120%]"
            }
          `}
        >
          <div
            className={`
              flex h-full flex-col overflow-hidden rounded-2xl border shadow-xl
              ${
                isDark
                  ? "border-cyan-500/15 bg-[#0d141e]"
                  : "border-slate-200 bg-white"
              }
            `}
          >
            {/* Palette Header */}

            <div
              className={`
                flex shrink-0 items-center justify-between border-b p-4 sm:p-5
                ${
                  isDark
                    ? "border-white/5"
                    : "border-slate-100"
                }
              `}
            >
              <div>
                <h2
                  className={`text-sm font-bold sm:text-base ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  Question Palette
                </h2>

                <p
                  className={`mt-1 text-[11px] ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Navigate between questions
                </p>
              </div>

              <div className="flex items-center gap-2">

                <LayoutGrid
                  size={18}
                  className={
                    isDark
                      ? "text-cyan-400"
                      : "text-cyan-600"
                  }
                />

                {/* Close mobile */}

                <button
                  onClick={() => setShowPalette(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg md:hidden cursor-pointer"
                >
                  <X
                    size={17}
                    className={
                      isDark
                        ? "text-slate-400"
                        : "text-slate-500"
                    }
                  />
                </button>
              </div>
            </div>

            {/* Legend */}

            {/* <div
              className={`
                grid shrink-0 grid-cols-2 gap-2 border-b p-3.5
                ${
                  isDark
                    ? "border-white/5"
                    : "border-slate-100"
                }
              `}
            >
              <div
                className={`flex items-center gap-2 text-[11px] ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                Answered
              </div>

              <div
                className={`flex items-center gap-2 text-[11px] ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full border ${
                    isDark
                      ? "border-slate-600 bg-slate-800"
                      : "border-slate-300 bg-slate-100"
                  }`}
                />
                Unanswered
              </div>

              <div
                className={`flex items-center gap-2 text-[11px] ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                Marked
              </div>

              <div
                className={`flex items-center gap-2 text-[11px] ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Current
              </div>
            </div> */}

            {/* Questions */}

            <div className="flex-1 overflow-y-auto p-4">

              <p
                className={`mb-3 text-[10px] font-bold uppercase tracking-wider ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Questions
              </p>

              <div className="grid grid-cols-5 gap-2">

                {questions.map((item, index) => {
                  const status = getQuestionStatus(index);
                  const isCurrent = index === currentQuestion;
                  const isLocked = index < currentQuestion;

                  let styles = isDark
                    ? "border-white/10 bg-[#121b27] text-slate-400"
                    : "border-slate-200 bg-slate-50 text-slate-500";

                  if (status === "answered") {
                    styles = isDark
                      ? "border-cyan-400/30 bg-cyan-400/15 text-cyan-300"
                      : "border-cyan-300 bg-cyan-50 text-cyan-700";
                  }

                  if (status === "marked") {
                    styles = isDark
                      ? "border-yellow-400/30 bg-yellow-400/15 text-yellow-300"
                      : "border-yellow-300 bg-yellow-50 text-yellow-700";
                  }

                  if (isCurrent) {
                    styles = isDark
                      ? "border-emerald-400/60 bg-emerald-400/20 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.15)]"
                      : "border-emerald-400 bg-emerald-50 text-emerald-700 shadow-sm";
                  }

                  if (isLocked) {
                    styles = isDark
                      ? "border-white/5 bg-[#0c131d] text-slate-600"
                      : "border-slate-200 bg-slate-100 text-slate-400";
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => goToQuestion(index)}
                      disabled={isLocked}
                      className={`
                        relative flex h-9 items-center justify-center
                        rounded-lg border text-xs font-bold
                        transition-all duration-200
                        ${
                          isLocked
                            ? "cursor-not-allowed opacity-70"
                            : "hover:-translate-y-[1px] cursor-pointer"
                        }
                        ${styles}
                      `}
                    >
                      {item.id}

                      {status === "marked" && !isLocked && (
                        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-yellow-400" />
                      )}

                      {isLocked && (
                        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-slate-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary */}

            <div
              className={`
                shrink-0 border-t p-4
                ${
                  isDark
                    ? "border-white/5"
                    : "border-slate-100"
                }
              `}
            >
              <div className="mb-2 flex justify-between text-[11px]">
                <span
                  className={
                    isDark ? "text-slate-500" : "text-slate-400"
                  }
                >
                  Attempted
                </span>

                <span
                  className={`font-semibold ${
                    isDark ? "text-cyan-400" : "text-cyan-600"
                  }`}
                >
                  {answeredCount}/{questions.length}
                </span>
              </div>

              <div
                className={`h-1.5 overflow-hidden rounded-full ${
                  isDark ? "bg-white/5" : "bg-slate-100"
                }`}
              >
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all"
                  style={{
                    width: `${
                      (answeredCount / questions.length) * 100
                    }%`,
                  }}
                />
              </div>

              <div
                className={`mt-3 flex justify-between text-[11px] ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                <span>
                  Marked:{" "}
                  <span className="text-yellow-500">
                    {markedCount}
                  </span>
                </span>

                <span>
                  Remaining:{" "}
                  <span
                    className={
                      isDark ? "text-white" : "text-slate-700"
                    }
                  >
                    {questions.length - answeredCount}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* ===================================================
            QUESTION AREA
        ==================================================== */}

        <section className="min-w-0 flex-1">

          <div
            className={`
              flex h-full flex-col overflow-hidden rounded-2xl border shadow-xl
              ${
                isDark
                  ? "border-cyan-500/15 bg-[#0d141e]"
                  : "border-slate-200 bg-white"
              }
            `}
          >

            {/* Question Header */}

            <div
              className={`
                flex shrink-0 items-center justify-between gap-3
                border-b px-4 py-3 sm:px-6 sm:py-4
                ${
                  isDark
                    ? "border-white/5"
                    : "border-slate-100"
                }
              `}
            >

              <div className="flex items-center gap-2.5 sm:gap-3">

                <div
                  className={`
                    flex h-9 w-9 items-center justify-center rounded-lg
                    text-sm font-bold sm:h-10 sm:w-10
                    ${
                      isDark
                        ? "bg-cyan-400/10 text-cyan-400"
                        : "bg-cyan-50 text-cyan-600"
                    }
                  `}
                >
                  {question?.id}
                </div>

                <div>
                  <p
                    className={`text-[10px] uppercase tracking-wider ${
                      isDark ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    Question
                  </p>

                  <p
                    className={`text-xs font-semibold sm:text-sm ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {question?.id} of {questions.length}
                  </p>
                </div>
              </div>

              {/* Mark button intentionally kept commented */}

              {/* 
              <button
                onClick={toggleMark}
                className={`
                  flex items-center gap-1.5 rounded-lg border
                  px-2.5 py-2 text-[11px] font-semibold
                  sm:px-4 sm:text-xs
                  ${
                    marked[question.id]
                      ? isDark
                        ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"
                        : "border-yellow-300 bg-yellow-50 text-yellow-700"
                      : isDark
                      ? "border-white/10 bg-white/5 text-slate-400 hover:border-yellow-400/30 hover:text-yellow-300"
                      : "border-slate-200 bg-slate-50 text-slate-500 hover:border-yellow-300 hover:text-yellow-600"
                  }
                `}
              >
                <Flag size={14} />

                <span className="hidden xs:inline sm:inline">
                  {marked[question.id]
                    ? "Marked"
                    : "Mark for Review"}
                </span>
              </button>
              */}
            </div>

            {/* Question Content */}

            <div className="flex-1 overflow-y-auto">

              <div className="p-5 sm:p-7 lg:p-10">

                <div className="max-w-4xl">

                  <span
                    className={`text-[10px] font-bold uppercase tracking-[0.18em] sm:text-xs ${
                      isDark ? "text-cyan-400" : "text-cyan-600"
                    }`}
                  >
                    Multiple Choice Question
                  </span>

                  <h2
                    className={`
                      mt-4 text-lg font-semibold leading-7
                      sm:mt-5 sm:text-xl sm:leading-8
                      lg:text-2xl
                      ${
                        isDark
                          ? "text-white"
                          : "text-slate-900"
                      }
                    `}
                  >
                    {question?.question}
                  </h2>
                </div>

                {/* Code Snippet */}

                <div className="w-full mt-4 overflow-x-auto rounded-xl border border-gray-800 bg-[#0d1117] p-5">
                  <pre className="m-0 whitespace-pre-wrap break-words font-mono text-sm leading-6 text-gray-300">
                    {question?.codeSnippet}
                  </pre>
                </div>

                {/* Options */}

                <div className="mt-7 grid w-full max-w-5xl grid-cols-2 gap-3 sm:mt-9 sm:gap-4">

                  {question?.options.map((option, index) => {
                    const isSelected =
                      answers[question.id] === index;

                    return (
                      <button
                        key={option}
                        onClick={() => selectAnswer(index)}
                        className={`
                          group flex min-w-0 w-full items-center gap-2
                          overflow-hidden rounded-xl border p-3 text-left
                          transition-all duration-200
                          sm:gap-4 sm:p-4 cursor-pointer
                          ${
                            isSelected
                              ? isDark
                                ? "border-cyan-400/60 bg-cyan-400/10 shadow-[0_0_25px_rgba(34,211,238,0.08)]"
                                : "border-cyan-400 bg-cyan-50 shadow-sm"
                              : isDark
                              ? "border-white/10 bg-[#111a25] hover:border-cyan-400/30 hover:bg-cyan-400/5"
                              : "border-slate-200 bg-slate-50 hover:border-cyan-300 hover:bg-cyan-50/50"
                          }
                        `}
                      >

                        {/* Letter */}

                        <span
                          className={`
                            flex h-9 w-9 shrink-0 items-center justify-center
                            rounded-lg border text-xs font-bold
                            sm:h-10 sm:w-10 sm:text-sm
                            ${
                              isSelected
                                ? isDark
                                  ? "border-cyan-400 bg-cyan-400 text-[#071118]"
                                  : "border-cyan-500 bg-cyan-500 text-white"
                                : isDark
                                ? "border-white/10 bg-white/5 text-slate-400 group-hover:border-cyan-400/30 group-hover:text-cyan-300"
                                : "border-slate-200 bg-white text-slate-500 group-hover:border-cyan-300 group-hover:text-cyan-600"
                            }
                          `}
                        >
                          {String.fromCharCode(65 + index)}
                        </span>

                        {/* Text */}

                        <span
                          className={`
                            min-w-0 flex-1 break-all
                            text-sm leading-5 sm:text-sm sm:leading-6
                            ${
                              isSelected
                                ? isDark
                                  ? "font-semibold text-cyan-100"
                                  : "font-semibold text-cyan-800"
                                : isDark
                                ? "text-slate-300"
                                : "text-slate-700"
                            }
                          `}
                        >
                          {option}
                        </span>

                        {/* Selected */}

                        {isSelected && (
                          <CheckCircle2
                            size={19}
                            className={`ml-auto shrink-0 ${
                              isDark
                                ? "text-cyan-400"
                                : "text-cyan-600"
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* =================================================
                BOTTOM NAVIGATION
            ================================================== */}

            <div
              className={`
                flex shrink-0 flex-col gap-2.5
                border-t px-4 py-3
                sm:flex-row sm:items-center sm:justify-between
                sm:px-6 sm:py-4
                ${
                  isDark
                    ? "border-white/5 bg-[#0a1119]"
                    : "border-slate-100 bg-slate-50"
                }
              `}
            >

              {/* Previous */}

              <button
                onClick={previousQuestion}
                disabled={true}
                className={`
                  flex items-center justify-center gap-2 rounded-xl
                  border px-4 py-2.5 text-xs font-semibold
                  sm:px-5 sm:py-3 sm:text-sm
                  ${
                    isDark
                      ? "border-white/10 bg-white/5 text-slate-300"
                      : "border-slate-200 bg-white text-slate-600"
                  }
                  cursor-not-allowed opacity-30
                `}
              >
                <ArrowLeft size={16} />
                Previous
              </button>

              <div
                className={`hidden items-center justify-center gap-2 text-xs md:flex ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                <HelpCircle size={14} />

                <span>
                  {timeRemaining > 0
                    ? `Time remaining: ${formatTime(timeRemaining)}`
                    : "Time is up"}
                </span>
              </div>

              {/* Last question */}

              {currentQuestion === questions.length - 1 ? (
                <Link
                  href={"/results"}
                  className="
                    flex items-center justify-center gap-2
                    rounded-xl bg-cyan-400 px-5 py-2.5
                    text-xs font-bold text-[#061016]
                    shadow-[0_0_25px_rgba(34,211,238,0.2)]
                    transition-all hover:bg-cyan-300
                    sm:px-6 sm:py-3 sm:text-sm cursor-pointer
                  "
                >
                  <Send size={16} />
                  Submit Assessment
                </Link>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="
                    flex items-center justify-center gap-2
                    rounded-xl bg-cyan-400 px-5 py-2.5
                    text-xs font-bold text-[#061016]
                    shadow-[0_0_25px_rgba(34,211,238,0.15)]
                    transition-all hover:bg-cyan-300
                    sm:px-6 sm:py-3 sm:text-sm
                  "
                >
                  Save & Next
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================
          THEME TOGGLE - BOTTOM
      ====================================================== */}

      <div
        className={`
          fixed left-1/2 z-[70]
          -translate-x-1/2
          bottom-2 sm:bottom-4
          rounded-full border p-1
          shadow-2xl backdrop-blur-xl
          ${
            isDark
              ? "border-white/10 bg-[#111923]/95"
              : "border-slate-200 bg-white/95"
          }
        `}
      >
        <div className="flex items-center gap-1">

          {/* Dark */}

          <button
            onClick={() => setTheme("dark")}
            className={`
              flex items-center gap-1.5 rounded-full
              px-3 py-1.5 text-[11px] font-semibold
              transition-all
              ${
                isDark
                  ? "bg-cyan-400 text-[#071118] shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  : "text-slate-500 hover:bg-slate-100"
              }
            `}
          >
            <Moon size={13} />
            Dark
          </button>

          {/* Light */}

          <button
            onClick={() => setTheme("light")}
            className={`
              flex items-center gap-1.5 rounded-full
              px-3 py-1.5 text-[11px] font-semibold
              transition-all
              ${
                !isDark
                  ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                  : "text-slate-500 hover:bg-white/10"
              }
            `}
          >
            <Sun size={13} />
            Light
          </button>

        </div>
      </div>
    </div>
  );
}