"use client";

import { useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Download,
  ArrowUpDown,
  Users,
  Trophy,
  CheckCircle2,
} from "lucide-react";
import { useAdminResults } from "../context/adminResult.context";

// =====================================================
// DUMMY RESULTS
// Backend se baad mein isi structure ka array pass kar dena
// =====================================================

// const dummyResults = [
//   {
//     id: 1,
//     candidateName: "Rahul Sharma",
//     email: "rahul.sharma@gmail.com",
//     phone: "+91 98765 43210",
//     testName: "JavaScript Fundamentals",
//     score: 92,
//     totalQuestions: 30,
//     correctAnswers: 28,
//     submittedAt: "20 Aug 2026, 11:42 AM",
//   },
//   {
//     id: 2,
//     candidateName: "Priya Verma",
//     email: "priya.verma@gmail.com",
//     phone: "+91 98123 45678",
//     testName: "React Frontend Challenge",
//     score: 89,
//     totalQuestions: 45,
//     correctAnswers: 40,
//     submittedAt: "20 Aug 2026, 12:18 PM",
//   },
//   {
//     id: 3,
//     candidateName: "Aman Gupta",
//     email: "aman.gupta@gmail.com",
//     phone: "+91 99887 66554",
//     testName: "Node.js Developer Test",
//     score: 84,
//     totalQuestions: 40,
//     correctAnswers: 34,
//     submittedAt: "20 Aug 2026, 01:05 PM",
//   },
//   {
//     id: 4,
//     candidateName: "Sneha Kapoor",
//     email: "sneha.kapoor@gmail.com",
//     phone: "+91 98712 33456",
//     testName: "SQL Advanced Assessment",
//     score: 78,
//     totalQuestions: 35,
//     correctAnswers: 27,
//     submittedAt: "20 Aug 2026, 02:21 PM",
//   },
//   {
//     id: 5,
//     candidateName: "Arjun Mehta",
//     email: "arjun.mehta@gmail.com",
//     phone: "+91 99111 22334",
//     testName: "JavaScript Fundamentals",
//     score: 74,
//     totalQuestions: 30,
//     correctAnswers: 22,
//     submittedAt: "20 Aug 2026, 03:10 PM",
//   },
//   {
//     id: 6,
//     candidateName: "Neha Singh",
//     email: "neha.singh@gmail.com",
//     phone: "+91 98222 33445",
//     testName: "React Frontend Challenge",
//     score: 96,
//     totalQuestions: 45,
//     correctAnswers: 43,
//     submittedAt: "20 Aug 2026, 03:42 PM",
//   },
//   {
//     id: 7,
//     candidateName: "Vikas Yadav",
//     email: "vikas.yadav@gmail.com",
//     phone: "+91 97654 32109",
//     testName: "Node.js Developer Test",
//     score: 67,
//     totalQuestions: 40,
//     correctAnswers: 27,
//     submittedAt: "20 Aug 2026, 04:18 PM",
//   },
//   {
//     id: 8,
//     candidateName: "Anjali Malhotra",
//     email: "anjali.malhotra@gmail.com",
//     phone: "+91 98989 12121",
//     testName: "SQL Advanced Assessment",
//     score: 88,
//     totalQuestions: 35,
//     correctAnswers: 31,
//     submittedAt: "20 Aug 2026, 04:56 PM",
//   },
//   {
//     id: 9,
//     candidateName: "Rohit Bansal",
//     email: "rohit.bansal@gmail.com",
//     phone: "+91 98777 66554",
//     testName: "JavaScript Fundamentals",
//     score: 81,
//     totalQuestions: 30,
//     correctAnswers: 24,
//     submittedAt: "20 Aug 2026, 05:14 PM",
//   },
//   {
//     id: 10,
//     candidateName: "Karan Joshi",
//     email: "karan.joshi@gmail.com",
//     phone: "+91 90011 22334",
//     testName: "React Frontend Challenge",
//     score: 71,
//     totalQuestions: 45,
//     correctAnswers: 32,
//     submittedAt: "20 Aug 2026, 05:48 PM",
//   },
//   {
//     id: 11,
//     candidateName: "Simran Kaur",
//     email: "simran.kaur@gmail.com",
//     phone: "+91 98888 77766",
//     testName: "Node.js Developer Test",
//     score: 93,
//     totalQuestions: 40,
//     correctAnswers: 37,
//     submittedAt: "21 Aug 2026, 10:15 AM",
//   },
//   {
//     id: 12,
//     candidateName: "Mohit Agarwal",
//     email: "mohit.agarwal@gmail.com",
//     phone: "+91 97777 11223",
//     testName: "SQL Advanced Assessment",
//     score: 64,
//     totalQuestions: 35,
//     correctAnswers: 22,
//     submittedAt: "21 Aug 2026, 11:03 AM",
//   },
//   {
//     id: 13,
//     candidateName: "Pooja Reddy",
//     email: "pooja.reddy@gmail.com",
//     phone: "+91 96666 55443",
//     testName: "JavaScript Fundamentals",
//     score: 87,
//     totalQuestions: 30,
//     correctAnswers: 26,
//     submittedAt: "21 Aug 2026, 12:31 PM",
//   },
//   {
//     id: 14,
//     candidateName: "Aditya Raj",
//     email: "aditya.raj@gmail.com",
//     phone: "+91 95555 44332",
//     testName: "React Frontend Challenge",
//     score: 79,
//     totalQuestions: 45,
//     correctAnswers: 35,
//     submittedAt: "21 Aug 2026, 01:12 PM",
//   },
//   {
//     id: 15,
//     candidateName: "Nisha Jain",
//     email: "nisha.jain@gmail.com",
//     phone: "+91 94444 33221",
//     testName: "Node.js Developer Test",
//     score: 91,
//     totalQuestions: 40,
//     correctAnswers: 36,
//     submittedAt: "21 Aug 2026, 02:45 PM",
//   },
// ];

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function TestResults() {
  const { results, isLoading } = useAdminResults();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  // Search
  const filteredResults = results.filter((candidate) => {
    const query = search.toLowerCase();

    return (
      candidate.candidateName.toLowerCase().includes(query) ||
      candidate.email.toLowerCase().includes(query) ||
      candidate.phone.toLowerCase().includes(query) ||
      candidate.testName.toLowerCase().includes(query)
    );
  });

  // Pagination
  const totalPages = Math.ceil(
    filteredResults.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentResults = filteredResults.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#071017] text-white">

      {/* BACKGROUND GRID */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(#38d9ff 1px, transparent 1px),
            linear-gradient(90deg, #38d9ff 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative mx-auto max-w-[1550px] px-5 py-8 lg:px-10">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-cyan-300">
              <Trophy size={13} />
              ASSESSMENT RESULTS
            </div>

            <h1 className="text-4xl font-black tracking-tight">
              Test Results
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Review candidate performance and assessment results.
            </p>
          </div>

          {/* SUMMARY */}
          <div className="flex items-center gap-3">

            <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#0d1722] px-4 py-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10">
                <Users
                  size={17}
                  className="text-cyan-400"
                />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                  Candidates
                </p>

                <p className="text-lg font-black">
                  {results.length}
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* TABLE PANEL */}
        <div className="overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#0b1420] shadow-[0_25px_80px_rgba(0,0,0,0.25)]">

          {/* TOOLBAR */}
          <div className="flex flex-col gap-4 border-b border-white/[0.06] p-5 lg:flex-row lg:items-center lg:justify-between lg:p-6">

            <div>
              <h2 className="text-lg font-extrabold">
                Candidate Results
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {filteredResults.length} results found
              </p>
            </div>

            <div className="relative w-full lg:w-[330px]">

              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  handleSearch(e.target.value)
                }
                placeholder="Search candidate, email or test..."
                className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#101b29] pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-400/30 focus:ring-4 focus:ring-cyan-400/[0.05]"
              />

            </div>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full min-w-[1050px] border-collapse">

              {/* TABLE HEAD */}
              <thead>
                <tr className="border-b border-white/[0.06] bg-[#0d1722]">

                  <th className="px-6 py-4 text-left">
                    <TableHeading label="Candidate" />
                  </th>

                  <th className="px-6 py-4 text-left">
                    <TableHeading label="Contact" />
                  </th>

                  <th className="px-6 py-4 text-left">
                    <TableHeading label="Assessment" />
                  </th>

                  <th className="px-6 py-4 text-center">
                    <TableHeading label="Score" />
                  </th>

                  {/* <th className="px-6 py-4 text-center">
                    <TableHeading label="Performance" />
                  </th> */}

                  <th className="px-6 py-4 text-left">
                    <TableHeading label="Submitted" />
                  </th>

                  {/* <th className="px-6 py-4 text-right">
                    <TableHeading label="Action" />
                  </th> */}

                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>

                {currentResults.map((candidate) => (
                  <ResultRow
                    key={candidate.id}
                    candidate={candidate}
                  />
                ))}

              </tbody>

            </table>

            {/* EMPTY */}
            {currentResults.length === 0 && (
              <div className="py-20 text-center">

                <Search
                  size={30}
                  className="mx-auto mb-3 text-slate-700"
                />

                <p className="text-sm font-semibold text-slate-500">
                  No results found
                </p>

                <p className="mt-1 text-xs text-slate-700">
                  Try searching with another name or email.
                </p>

              </div>
            )}

          </div>

          {/* PAGINATION */}
          {filteredResults.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={filteredResults.length}
              startIndex={startIndex}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          )}

        </div>

      </div>
    </div>
  );
}

// =====================================================
// TABLE ROW
// =====================================================

function ResultRow({ candidate }) {
  return (
    <tr className="group border-b border-white/[0.045] transition hover:bg-cyan-400/[0.025]">

      {/* CANDIDATE */}
      <td className="px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06] text-sm font-black text-cyan-300">
            {getInitials(candidate.candidateName)}
          </div>

          <div className="min-w-0">

            <p className="truncate text-sm font-bold text-white">
              {candidate.candidateName}
            </p>

            <p className="mt-1 text-xs text-slate-600">
              ID #{String(candidate.id).padStart(4, "0")}
            </p>

          </div>

        </div>

      </td>

      {/* CONTACT */}
      <td className="px-6 py-5">

        <div className="space-y-1">

          <p className="text-xs font-medium text-slate-300">
            {candidate.email}
          </p>

          <p className="text-xs text-slate-600">
            {candidate.phone}
          </p>

        </div>

      </td>

      {/* TEST */}
      <td className="px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.035]">
            <Trophy
              size={15}
              className="text-cyan-400"
            />
          </div>

          <div>

            <p className="max-w-[210px] truncate text-sm font-semibold text-slate-300">
              {candidate.testName}
            </p>

            <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-700">
              {candidate.correctAnswers}/
              {candidate.totalQuestions} correct
            </p>

          </div>

        </div>

      </td>

      {/* SCORE */}
      <td className="px-6 py-5">
        <div className="flex flex-col items-center gap-2">
            <ScoreBadge score={candidate.score} />

            <span className="text-xs font-medium text-slate-500">
            <span className="font-bold text-slate-300">
                {candidate.correctAnswers}
            </span>
            /{candidate.totalQuestions} correct
            </span>
        </div>
        </td>

      {/* PERFORMANCE */}
      {/* <td className="px-6 py-5">

        <div className="mx-auto w-[120px]">

          <div className="mb-1.5 flex items-center justify-between">

            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-700">
              Score
            </span>

            <span className="text-[10px] font-bold text-slate-500">
              {candidate.score}%
            </span>

          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">

            <div
              className={`h-full rounded-full transition-all ${
                candidate.score >= 85
                  ? "bg-emerald-400"
                  : candidate.score >= 70
                    ? "bg-cyan-400"
                    : "bg-amber-400"
              }`}
              style={{
                width: `${candidate.score}%`,
              }}
            />

          </div>

        </div>

      </td> */}

      {/* SUBMITTED */}
      <td className="px-6 py-5">

        <p className="whitespace-nowrap text-xs text-slate-500">
          {candidate.submittedAt}
        </p>

      </td>

      {/* ACTION */}
      {/* <td className="px-6 py-5">

        <div className="flex justify-end gap-2">

          <button
            title="View result"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025] text-slate-500 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.06] hover:text-cyan-300"
          >
            <Eye size={15} />
          </button>

          <button
            title="More"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025] text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
          >
            <MoreHorizontal size={15} />
          </button>

        </div>

      </td> */}

    </tr>
  );
}

// =====================================================
// SCORE BADGE
// =====================================================

function ScoreBadge({ score }) {
  let classes = "";

  if (score >= 85) {
    classes =
      "border-emerald-400/15 bg-emerald-400/[0.08] text-emerald-300";
  } else if (score >= 70) {
    classes =
      "border-cyan-400/15 bg-cyan-400/[0.08] text-cyan-300";
  } else {
    classes =
      "border-amber-400/15 bg-amber-400/[0.08] text-amber-300";
  }

  return (
    <span
      className={`inline-flex min-w-[58px] items-center justify-center rounded-full border px-3 py-1.5 text-xs font-black ${classes}`}
    >
      {score}%
    </span>
  );
}

// =====================================================
// TABLE HEADING
// =====================================================

function TableHeading({ label }) {
  return (
    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-slate-600">
      {label}
      <ArrowUpDown size={11} />
    </div>
  );
}

// =====================================================
// PAGINATION
// =====================================================

function Pagination({
  currentPage,
  totalPages,
  totalResults,
  startIndex,
  itemsPerPage,
  onPageChange,
}) {
  const start = startIndex + 1;
  const end = Math.min(
    startIndex + itemsPerPage,
    totalResults
  );

  return (
    <div className="flex flex-col gap-4 border-t border-white/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">

      {/* INFO */}
      <p className="text-xs text-slate-600">
        Showing{" "}
        <span className="font-bold text-slate-400">
          {start}-{end}
        </span>{" "}
        of{" "}
        <span className="font-bold text-slate-400">
          {totalResults}
        </span>{" "}
        candidates
      </p>

      {/* CONTROLS */}
      <div className="flex items-center gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-slate-500 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1">

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                flex h-9 min-w-9 items-center justify-center
                rounded-lg px-2 text-xs font-bold transition
                ${
                  currentPage === page
                    ? "bg-cyan-400 text-[#061018]"
                    : "text-slate-500 hover:bg-white/[0.06] hover:text-white"
                }
              `}
            >
              {page}
            </button>
          ))}

        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-slate-500 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight size={16} />
        </button>

      </div>

    </div>
  );
}

// =====================================================
// INITIALS
// =====================================================

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}