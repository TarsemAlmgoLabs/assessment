"use client";
import Link from "next/link";
import React from "react";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Eye,
  FileText,
  ShieldCheck,
  Trophy,
  XCircle,
} from "lucide-react";

import { useHistory } from "../context/history.context";

// const assessmentHistory = [
//   {
//     id: "assessment-001",
//     name: "JavaScript Skill Assessment",
//     date: "18 Aug 2026",
//     time: "07:42 PM",

//     score: 24,
//     totalMarks: 30,
//     percentage: 80,

//     correct: 24,
//     wrong: 4,
//     skipped: 2,

//     status: "passed",
//   },

//   {
//     id: "assessment-002",
//     name: "React.js Developer Assessment",
//     date: "14 Aug 2026",
//     time: "06:18 PM",

//     score: 21,
//     totalMarks: 30,
//     percentage: 70,

//     correct: 21,
//     wrong: 6,
//     skipped: 3,

//     status: "passed",
//   },

//   {
//     id: "assessment-003",
//     name: "Node.js Backend Assessment",
//     date: "09 Aug 2026",
//     time: "08:05 PM",

//     score: 16,
//     totalMarks: 30,
//     percentage: 53,

//     correct: 16,
//     wrong: 9,
//     skipped: 5,

//     status: "failed",
//   },

//   {
//     id: "assessment-004",
//     name: "MongoDB & Database Assessment",
//     date: "03 Aug 2026",
//     time: "05:32 PM",

//     score: 27,
//     totalMarks: 30,
//     percentage: 90,

//     correct: 27,
//     wrong: 2,
//     skipped: 1,

//     status: "passed",
//   },

//   {
//     id: "assessment-005",
//     name: "Frontend Fundamentals",
//     date: "28 Jul 2026",
//     time: "04:11 PM",

//     score: 18,
//     totalMarks: 30,
//     percentage: 60,

//     correct: 18,
//     wrong: 8,
//     skipped: 4,

//     status: "passed",
//   },

//   {
//     id: "assessment-006",
//     name: "JavaScript Advanced Concepts",
//     date: "21 Jul 2026",
//     time: "07:26 PM",

//     score: 13,
//     totalMarks: 30,
//     percentage: 43,

//     correct: 13,
//     wrong: 12,
//     skipped: 5,

//     status: "failed",
//   },
// ];

export default function AssessmentHistory() {
  const { historyData: assessmentHistory, loading } = useHistory();

  if (loading || !assessmentHistory) {
    return (
      <div className="min-h-screen bg-[#080d13] flex items-center justify-center text-cyan-400">
        Loading History...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d13] text-white">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0b1119]/95 backdrop-blur-xl">

        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/10 text-cyan-400">
              <ShieldCheck size={20} />
            </div>

            <div>
              <h1 className="text-sm font-bold text-white sm:text-base">
                Assessment History
              </h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                VeStaff Candidate Portal
              </p>
            </div>

          </div>

          {/* Total */}
          <div className="hidden items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2 sm:flex">
            <FileText
              size={15}
              className="text-cyan-400"
            />

            <span className="text-xs font-semibold text-slate-400">
              {assessmentHistory.length} Assessments
            </span>
          </div>

        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="relative mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">

        {/* Background glow */}
        <div className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/[0.025] blur-[120px]" />

        {/* =================================================
            PAGE TITLE
        ================================================== */}

        <div className="mb-7">

          <div className="flex items-end justify-between gap-4">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">
                Your Activity
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Assessment History
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                View all assessments you have completed and
                review your previous results.
              </p>
            </div>

            <div className="hidden rounded-xl border border-white/[0.06] bg-[#0d141e] px-4 py-3 text-right sm:block">
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Total Attempts
              </p>

              <p className="mt-1 text-xl font-black text-white">
                {assessmentHistory.length}
              </p>
            </div>

          </div>

        </div>

        {/* =================================================
            CARDS
        ================================================== */}

        <div className="grid gap-4 lg:grid-cols-2">

          {assessmentHistory.map((assessment) => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
            />
          ))}

        </div>

        {/* =================================================
            BACK
        ================================================== */}

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
    </div>
  );
}

/* =========================================================
   ASSESSMENT CARD
========================================================= */

function AssessmentCard({ assessment }) {
  const passed = assessment.status === "passed";

  return (
    <div
      className="
        group overflow-hidden rounded-2xl
        border border-white/[0.07]
        bg-[#0d141e]
        shadow-[0_5px_25px_rgba(0,0,0,0.12)]
        transition-all duration-200
        hover:-translate-y-0.5
        hover:border-cyan-400/20
        hover:shadow-[0_10px_35px_rgba(0,0,0,0.18)]
      "
    >

      {/* =================================================
          TOP
      ================================================== */}

      <div className="p-5 sm:p-6">

        <div className="flex items-start gap-4">

          {/* Icon */}
          <div
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-xl border
              border-cyan-400/10
              bg-cyan-400/[0.06]
              text-cyan-400
            "
          >
            <FileText size={20} />
          </div>

          {/* Name */}
          <div className="min-w-0 flex-1">

            <h3 className="text-sm font-bold leading-6 text-white sm:text-base">
              {assessment.name}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">

              <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <CalendarDays size={13} />
                {assessment.date}
              </span>

              <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Clock3 size={13} />
                {assessment.time}
              </span>

            </div>

          </div>

          {/* Status */}
          <div
            className={`
              flex shrink-0 items-center gap-1.5
              rounded-full border px-2.5 py-1.5
              text-[9px] font-bold uppercase tracking-wide
              ${passed
                ? "border-emerald-400/15 bg-emerald-400/10 text-emerald-400"
                : "border-red-400/15 bg-red-400/10 text-red-400"
              }
            `}
          >
            {passed ? (
              <CheckCircle2 size={12} />
            ) : (
              <XCircle size={12} />
            )}

            {passed ? "Passed" : "Failed"}
          </div>

        </div>

        {/* =================================================
            SCORE
        ================================================== */}

        <div className="mt-6 flex items-center gap-5">

          {/* Percentage */}
          <div className="flex items-center gap-3">

            <div
              className={`
                flex h-16 w-16 shrink-0 items-center
                justify-center rounded-full border-[3px]
                ${passed
                  ? "border-cyan-400/20 bg-cyan-400/[0.04]"
                  : "border-red-400/20 bg-red-400/[0.04]"
                }
              `}
            >
              <span
                className={`
                  text-lg font-black
                  ${passed
                    ? "text-cyan-300"
                    : "text-red-400"
                  }
                `}
              >
                {assessment.percentage}%
              </span>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Score
              </p>

              <p className="mt-1 text-base font-bold text-white">
                {assessment.score}
                <span className="font-normal text-slate-600">
                  {" "}
                  / {assessment.totalMarks}
                </span>
              </p>
            </div>

          </div>

          {/* Divider */}
          <div className="h-10 w-px bg-white/[0.06]" />

          {/* Stats */}
          <div className="grid flex-1 grid-cols-3 gap-2">

            <MiniStat
              label="Correct"
              value={assessment.correct}
              color="green"
            />

            <MiniStat
              label="Wrong"
              value={assessment.wrong}
              color="red"
            />

            <MiniStat
              label="Skipped"
              value={assessment.skipped}
              color="yellow"
            />

          </div>

        </div>

      </div>

      {/* =================================================
          FOOTER
      ================================================== */}

      <div
        className="
          flex items-center justify-between
          border-t border-white/[0.06]
          bg-white/[0.015]
          px-5 py-3.5
          sm:px-6
        "
      >

        <div className="flex items-center gap-2">

          {passed ? (
            <Trophy
              size={15}
              className="text-cyan-400"
            />
          ) : (
            <XCircle
              size={15}
              className="text-red-400"
            />
          )}

          <span className="text-[11px] text-slate-500">
            {passed
              ? "Assessment completed successfully"
              : "Assessment not passed"}
          </span>

        </div>

        <Link
          href={"/results"}
          className="
            flex items-center gap-2
            rounded-lg border
            border-cyan-400/15
            bg-cyan-400/[0.06]
            px-3.5 py-2
            text-xs font-semibold
            text-cyan-400
            transition-all
            hover:border-cyan-400/30
            hover:bg-cyan-400/10
          "
        >
          <Eye size={14} />
          View Result
        </Link>

      </div>

    </div>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({
  label,
  value,
  color,
}) {
  const colors = {
    green: "text-emerald-400",
    red: "text-red-400",
    yellow: "text-yellow-400",
  };

  return (
    <div>
      <p className="text-[9px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p
        className={`mt-1 text-sm font-bold ${colors[color]}`}
      >
        {value}
      </p>
    </div>
  );
}