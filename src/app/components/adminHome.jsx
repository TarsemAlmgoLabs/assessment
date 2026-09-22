


"use client";

import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  Users,
  ChevronRight,
  CheckCircle2,
  Trophy,
  Code2,
  Database,
  BrainCircuit,
  Server,
  CircleAlert,
  Zap,
  Play,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAssessments } from "../context/admin.context";



// =====================================================
// MAIN COMPONENT
// =====================================================

export default function AssessmentAdminPanel() {
  const { liveTests, upcomingTests, pastTests, isLoading } = useAssessments();
  // liveTests = dummyLiveTests,
  // upcomingTests = dummyUpcomingTests,
  // pastTests = dummyPastTests,
// }) {
  const [activeTab, setActiveTab] = useState("live");
  
  const router = useRouter();


  // ===================================================
  // NAVIGATION
  // ===================================================

  function movingFunction(status, jobId="", assessmentId="") {
    if (status === "past") {
      router.push(`/allResults?jobId=${jobId}&assessmentId=${assessmentId}`);
    }else if(status === 'upcoming'){
      router.push(`/manage-assessment?jobId=${jobId}&assessmentId=${assessmentId}`);
    }
  }

  const tabs = [
    {
      key: "live",
      label: "Live Tests",
      count: liveTests.length,
    },
    {
      key: "past",
      label: "Past Tests",
      count: pastTests.length,
    },
    {
      key: "upcoming",
      label: "Upcoming Tests",
      count: upcomingTests.length,
    },
  ];

  return (
    <div className="min-h-screen bg-[#071017] text-white">

      {/* BACKGROUND */}
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

      <div className="relative mx-auto max-w-[1500px] px-6 py-8 lg:px-10">

        {/* HEADER */}
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-cyan-300">
            <Zap size={13} />
            ASSESSMENT MANAGEMENT
          </div>

          <h1 className="text-4xl font-black tracking-tight">
            Tests
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Manage live, upcoming and completed assessments.
          </p>
        </div>

        {/* MAIN PANEL */}
        <div className="overflow-hidden rounded-[26px] border border-white/[0.07] bg-[#0b1420]">

          {/* TABS */}
          <div className="border-b border-white/[0.06] px-5 pt-5 lg:px-6">

            <div className="flex w-full gap-2 overflow-x-auto">

              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;

                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`
                      flex shrink-0 items-center gap-2
                      rounded-t-xl border-b-2 px-5 py-4
                      text-sm font-bold transition-all
                      ${
                        isActive
                          ? "border-cyan-400 bg-cyan-400/[0.06] text-cyan-300"
                          : "border-transparent text-slate-500 hover:bg-white/[0.02] hover:text-slate-300"
                      }
                    `}
                  >

                    {tab.key === "live" && (
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isActive
                            ? "bg-red-400"
                            : "bg-slate-600"
                        }`}
                      />
                    )}

                    {tab.key === "past" && (
                      <CheckCircle2 size={15} />
                    )}

                    {tab.key === "upcoming" && (
                      <CalendarDays size={15} />
                    )}

                    {tab.label}

                    <span
                      className={`
                        rounded-full px-2 py-0.5 text-[10px]
                        ${
                          isActive
                            ? "bg-cyan-400/10 text-cyan-300"
                            : "bg-white/[0.05] text-slate-600"
                        }
                      `}
                    >
                      {tab.count}
                    </span>

                  </button>
                );
              })}

            </div>

          </div>

          {/* CONTENT */}
          <div className="p-5 lg:p-6">

            {/* LIVE */}
            {activeTab === "live" && (
              <>
                <SectionHeader
                  title="Live Assessments"
                  subtitle="Currently active assessments"
                  count={liveTests.length}
                />

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                  {liveTests.map((test, index) => (
                    <TestCard
                      key={test.id || index}
                      test={test}
                      status="live"
                      movingFunction={movingFunction}
                    />
                  ))}

                </div>
              </>
            )}

            {/* PAST */}
            {activeTab === "past" && (
              <>
                <SectionHeader
                  title="Past Assessments"
                  subtitle="Previously completed assessments"
                  count={pastTests.length}
                />

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                  {pastTests.map((test, index) => (
                    <TestCard
                      key={test.id || index}
                      test={test}
                      status="past"
                      movingFunction={movingFunction}
                    />
                  ))}

                </div>
              </>
            )}

            {/* UPCOMING */}
            {activeTab === "upcoming" && (
              <>
                <SectionHeader
                  title="Upcoming Assessments"
                  subtitle="Scheduled assessments"
                  count={upcomingTests.length}
                />

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                  {upcomingTests.map((test, index) => (
                    <TestCard
                      key={test.id || index}
                      test={test}
                      status="upcoming"
                      movingFunction={movingFunction}
                    />
                  ))}

                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// SECTION HEADER
// =====================================================

function SectionHeader({
  title,
  subtitle,
  count,
}) {
  return (
    <div className="mb-6 flex items-end justify-between">

      <div>

        <h2 className="text-xl font-extrabold text-white">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {subtitle}
        </p>

      </div>

      <div className="hidden rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-slate-500 sm:block">
        {count} Tests
      </div>

    </div>
  );
}

// =====================================================
// TEST CARD
// =====================================================

function TestCard({
  test,
  status,
  movingFunction,
}) {
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const recruiterName =
    test.recruiter?.name || "Unknown Recruiter";

  const recruiterEmail =
    test.recruiter?.email || "No email available";

  const companyName =
    test.recruiter?.companyName || "Unknown Company";

  return (
    <div
      className={`
        group relative overflow-hidden rounded-[22px]
        border bg-[#101a28]
        transition-all duration-300
        hover:-translate-y-1
        ${
          status === "live"
            ? "border-red-400/10 hover:border-red-400/25"
            : status === "upcoming"
            ? "border-amber-400/10 hover:border-amber-400/25"
            : "border-emerald-400/10 hover:border-emerald-400/25"
        }
      `}
    >
      {/* TOP LINE */}
      <div
        className={`
          absolute left-0 right-0 top-0 h-[2px]
          ${
            status === "live"
              ? "bg-red-400"
              : status === "upcoming"
              ? "bg-amber-400"
              : "bg-emerald-400"
          }
        `}
      />

      <div className="p-5">

        {/* CARD HEADER */}
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-[#0a141f]">
            {getTestIcon(test)}
          </div>

          <StatusBadge status={status} />
        </div>

        {/* ASSESSMENT */}
        <div className="mb-2 text-[10px] font-black tracking-[0.2em] text-cyan-400">
          ASSESSMENT
        </div>

        <h3 className="text-lg font-extrabold text-white">
          {test.title || "Untitled Assessment"}
        </h3>

        {/* ASSESSMENT ID */}
        <div className="mt-2">
          <p className="text-[10px] uppercase tracking-wider text-slate-600">
            Assessment ID
          </p>

          <p className="mt-1 break-all font-mono text-[11px] text-slate-500">
            {test.assessmentId || "N/A"}
          </p>
        </div>

        {/* RECRUITER */}
        <div className="mt-5 rounded-xl border border-white/[0.06] bg-[#0b141f] p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                Recruiter
              </p>

              <p className="mt-1 truncate text-sm font-bold text-slate-300">
                {recruiterName}
              </p>

              <p className="mt-0.5 truncate text-xs text-slate-500">
                {recruiterEmail}
              </p>
            </div>

            <div className="shrink-0 rounded-lg bg-cyan-400/10 px-2.5 py-1.5 text-[10px] font-bold text-cyan-300">
              {companyName}
            </div>
          </div>
        </div>

        {/* LIVE INFO */}
        {status === "live" && (
          <div className="mt-5 rounded-xl border border-red-400/10 bg-red-400/[0.035] p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Assessment Window
              </span>

              <span className="text-xs font-bold text-red-300">
                Live Now
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <Clock3 size={13} />
              {formatTime(test.startDate)} - {formatTime(test.endDate)}
            </div>
          </div>
        )}

        {/* PAST INFO */}
        {status === "past" && (
          <div className="mt-5 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.035] p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10">
                <Trophy
                  size={16}
                  className="text-emerald-400"
                />
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-600">
                  Completed On
                </div>

                <div className="text-sm font-bold text-emerald-300">
                  {formatDate(test.endDate)}
                </div>
              </div>

              <CheckCircle2
                size={17}
                className="ml-auto text-emerald-400"
              />
            </div>
          </div>
        )}

        {/* UPCOMING INFO */}
        {status === "upcoming" && (
          <div className="mt-5 rounded-xl border border-amber-400/10 bg-amber-400/[0.035] p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/10">
                <CalendarDays
                  size={16}
                  className="text-amber-400"
                />
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-600">
                  Scheduled
                </div>

                <div className="text-sm font-bold text-amber-300">
                  {formatDate(test.startDate)}
                </div>

                <div className="mt-0.5 text-xs text-slate-500">
                  {formatTime(test.startDate)} -{" "}
                  {formatTime(test.endDate)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* META */}
        <div className="mt-4 grid grid-cols-3 divide-x divide-white/[0.06] rounded-xl border border-white/[0.06] bg-[#0b141f] py-3">

          <MetaItem
            icon={<CalendarDays size={14} />}
            label="Start"
            value={formatDate(test.startDate)}
          />

          <MetaItem
            icon={<Clock3 size={14} />}
            label="End"
            value={formatDate(test.endDate)}
          />

          <MetaItem
            icon={<CheckCircle2 size={14} />}
            label="Mandatory"
            value={test.isMandatory ? "Yes" : "No"}
          />

        </div>

        {/* JOB ID */}
        <div className="mt-4">
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
            Job ID
          </p>

          <p className="mt-1 truncate font-mono text-[11px] text-slate-500">
            {test.jobId || "N/A"}
          </p>
        </div>

        {/* ACTION */}
        <button
          type="button"
          onClick={() => movingFunction(status, test.jobId, test.assessmentId)}
          disabled={status === "live"}
          className={`
            mt-5 flex h-11 w-full items-center
            justify-center gap-2 rounded-xl
            p-4 text-sm font-extrabold
            transition-all
            ${
              status === "live"
                ? "cursor-not-allowed bg-cyan-400 text-[#061018] opacity-40"
                : status === "upcoming"
                ? "cursor-pointer border border-amber-400/20 bg-amber-400/[0.06] text-amber-300 hover:bg-amber-400/[0.1]"
                : "cursor-pointer border border-white/[0.08] bg-white/[0.035] text-slate-300 hover:bg-white/[0.06]"
            }
          `}
        >
          {status === "live" && (
            <>
              <Play size={15} fill="currentColor" />
              Test Live
            </>
          )}

          {status === "upcoming" && (
            <>
              <CalendarDays size={15} />
              Manage Assessment
            </>
          )}

          {status === "past" && (
            <>
              <Trophy size={15} />
              View Results
            </>
          )}

          <ChevronRight
            size={15}
            className="ml-auto"
          />
        </button>

      </div>
    </div>
  );
}
// =====================================================
// ICON
// =====================================================

function getTestIcon(test) {
  const value = (
    test.category ||
    test.title ||
    ""
  ).toLowerCase();

  if (value.includes("react")) {
    return (
      <BrainCircuit
        size={22}
        className="text-cyan-400"
      />
    );
  }

  if (
    value.includes("node") ||
    value.includes("backend") ||
    value.includes("express") ||
    value.includes("python")
  ) {
    return (
      <Server
        size={22}
        className="text-emerald-400"
      />
    );
  }

  if (
    value.includes("sql") ||
    value.includes("database")
  ) {
    return (
      <Database
        size={22}
        className="text-violet-400"
      />
    );
  }

  return (
    <Code2
      size={22}
      className="text-cyan-400"
    />
  );
}

// =====================================================
// STATUS BADGE
// =====================================================

function StatusBadge({ status }) {
  if (status === "live") {
    return (
      <span className="flex items-center gap-1.5 rounded-full border border-red-400/15 bg-red-400/[0.08] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-red-300">

        <span className="relative flex h-2 w-2">
          <span className="absolute h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
          <span className="relative h-2 w-2 rounded-full bg-red-400" />
        </span>

        Live
      </span>
    );
  }

  if (status === "upcoming") {
    return (
      <span className="flex items-center gap-1.5 rounded-full border border-amber-400/15 bg-amber-400/[0.08] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-amber-300">

        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />

        Upcoming
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/[0.08] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300">

      <CheckCircle2 size={11} />

      Completed
    </span>
  );
}

// =====================================================
// META ITEM
// =====================================================

function MetaItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex flex-col items-center gap-1 px-2 text-center">

      <div className="text-slate-600">
        {icon}
      </div>

      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
        {label}
      </span>

      <span className="text-xs font-bold text-slate-300">
        {value}
      </span>

    </div>
  );
}