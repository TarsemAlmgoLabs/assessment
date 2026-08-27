"use client";

import { useState, useEffect } from "react";
import {
  CalendarDays,
  Clock3,
  Users,
  Timer,
  AlertTriangle,
  X,
  Save,
  ChevronLeft,
  CheckCircle2,
  CalendarClock,
  ShieldAlert,
} from "lucide-react";
import { useManageAssessment } from "../context/manageAssessment.context";
import { useRouter } from "next/navigation";

// =====================================================
// DUMMY ASSESSMENT
// =====================================================

// const dummyAssessment = {
//   id: 1,
//   title: "Advanced React Assessment",
//   category: "Frontend",
//   description:
//     "Advanced React assessment covering hooks, state management, performance and scalable architecture.",
//   candidates: 94,
//   questions: 45,
//   duration: "60 Minutes",
//   startDate: "2026-08-26",
//   startTime: "11:00",
//   endDate: "2026-08-28",
//   endTime: "18:00",
//   status: "upcoming",
// };

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function ManageAssessment() {

  const { assessment, isLoading, updateSchedule, cancelAssessment } = useManageAssessment();
  const router = useRouter();
  
  const [startDate, setStartDate] = useState(
    assessment?.startDate || ""
  );

  const [startTime, setStartTime] = useState(
    assessment?.startTime || ""
  );

  const [endDate, setEndDate] = useState(
    assessment?.endDate || ""
  );

  const [endTime, setEndTime] = useState(
    assessment?.endTime || ""
  );

  const [showCancelModal, setShowCancelModal] =
    useState(false);

  const [saving, setSaving] = useState(false);

  const [cancelled, setCancelled] = useState(false);


  // Jab assessment load ho jaye, toh state me values set karni padengi input fields ke liye
  useEffect(() => {
    if (assessment) {
      setStartDate(assessment.startDate);
      setStartTime(assessment.startTime);
      setEndDate(assessment.endDate);
      setEndTime(assessment.endTime);
      
      // Agar backend se cancelled aaya hai
      if(assessment.status === "cancelled") {
          setCancelled(true);
      }
    }
  }, [assessment]);

  // Loading Screen
  if (isLoading || !assessment) {
    return <div className="min-h-screen bg-[#071017] text-white flex items-center justify-center">Loading Assessment Details...</div>;
  }

  // ===================================================
  // SAVE
  // ===================================================

  const handleSave = async () => {
    setSaving(true);
    
    // API Call through Context
    const success = await updateSchedule({
      ...assessment,
      startDate,
      startTime,
      endDate,
      endTime,
    });

    setSaving(false);
    
    if (success) {
      router.back("/admin"); // Ya router.push("/admin") jo bhi route ho
    }
  };

  // ===================================================
  // CANCEL
  // ===================================================

  const handleCancelAssessment = async () => {
    setShowCancelModal(false);
    
    // API Call through Context
    const success = await cancelAssessment();
    
    if(success) {
       setCancelled(true); 
    }
  };

  // ===================================================
  // CANCELLED STATE
  // ===================================================

  if (cancelled) {
    return (
      <div className="min-h-screen bg-[#071017] text-white">

        <div className="mx-auto flex min-h-screen max-w-[900px] items-center justify-center px-6">

          <div className="w-full rounded-[28px] border border-red-400/10 bg-[#0b1420] p-10 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-400/10">
              <X
                size={30}
                className="text-red-400"
              />
            </div>

            <h2 className="text-2xl font-black">
              Assessment Cancelled
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              The assessment has been cancelled and
              candidates will no longer be able to access
              it.
            </p>

            <button
              onClick={() => router.back()} // <-- Ye automatically pichle page pe le jayega
              className="mb-5 flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-cyan-300"
            >
              <ChevronLeft size={15} />
              Back to Assessments
            </button>

          </div>

        </div>

      </div>
    );
  }

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

      <main className="relative mx-auto max-w-[1200px] px-5 py-8 lg:px-10">

        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <button
              onClick={() => router.back()}
              className="mb-5 flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-cyan-300"
            >
              <ChevronLeft size={15} />
              Back to Assessments
            </button>

            <div className="mb-3 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.06]">
                <CalendarClock
                  size={21}
                  className="text-cyan-400"
                />
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">
                  Manage Assessment
                </p>

                <h1 className="mt-1 text-3xl font-black tracking-tight">
                  {assessment.title}
                </h1>
              </div>

            </div>

            <p className="max-w-2xl text-sm leading-6 text-slate-500">
              Configure when this assessment will be
              available to candidates.
            </p>

          </div>

          {/* STATUS */}
          <div className="flex w-fit items-center gap-2 rounded-full border border-amber-400/15 bg-amber-400/[0.07] px-3 py-2 text-[10px] font-black uppercase tracking-wider text-amber-300">

            <span className="h-2 w-2 rounded-full bg-amber-400" />

            Upcoming Assessment

          </div>

        </div>

        {/* CONTENT */}
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* LEFT */}
          <div className="space-y-6">

            {/* ASSESSMENT INFO */}
            <section className="rounded-[24px] border border-white/[0.07] bg-[#0b1420]">

              <div className="border-b border-white/[0.06] px-6 py-5">

                <h2 className="font-extrabold">
                  Assessment Details
                </h2>

                <p className="mt-1 text-xs text-slate-600">
                  Basic information about this assessment.
                </p>

              </div>

              <div className="grid gap-4 p-6 sm:grid-cols-3">

                <InfoBox
                  icon={<Users size={16} />}
                  label="Candidates"
                  value={assessment.candidates}
                />

                <InfoBox
                  icon={<CheckCircle2 size={16} />}
                  label="Questions"
                  value={assessment.questions}
                />

                <InfoBox
                  icon={<Timer size={16} />}
                  label="Duration"
                  value={assessment.duration}
                />

              </div>

            </section>

            {/* SCHEDULE */}
            <section className="rounded-[24px] border border-white/[0.07] bg-[#0b1420]">

              <div className="border-b border-white/[0.06] px-6 py-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/[0.07]">
                    <CalendarDays
                      size={17}
                      className="text-cyan-400"
                    />
                  </div>

                  <div>

                    <h2 className="font-extrabold">
                      Assessment Schedule
                    </h2>

                    <p className="mt-1 text-xs text-slate-600">
                      Set the window during which candidates
                      can take the assessment.
                    </p>

                  </div>

                </div>

              </div>

              <div className="space-y-7 p-6">

                {/* START */}
                <div>

                  <div className="mb-4 flex items-center gap-2">

                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/10 text-[10px] font-black text-emerald-400">
                      1
                    </span>

                    <h3 className="text-sm font-bold">
                      Start Date & Time
                    </h3>

                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">

                    <DateField
                      label="Start Date"
                      value={startDate}
                      onChange={setStartDate}
                    />

                    <TimeField
                      label="Start Time"
                      value={startTime}
                      onChange={setStartTime}
                    />

                  </div>

                </div>

                {/* DIVIDER */}
                <div className="border-t border-dashed border-white/[0.07]" />

                {/* END */}
                <div>

                  <div className="mb-4 flex items-center gap-2">

                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/10 text-[10px] font-black text-amber-400">
                      2
                    </span>

                    <h3 className="text-sm font-bold">
                      End Date & Time
                    </h3>

                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">

                    <DateField
                      label="End Date"
                      value={endDate}
                      onChange={setEndDate}
                    />

                    <TimeField
                      label="End Time"
                      value={endTime}
                      onChange={setEndTime}
                    />

                  </div>

                </div>

                {/* INFO */}
                <div className="flex gap-3 rounded-xl border border-cyan-400/10 bg-cyan-400/[0.035] p-4">

                  <Clock3
                    size={17}
                    className="mt-0.5 shrink-0 text-cyan-400"
                  />

                  <p className="text-xs leading-5 text-slate-500">
                    Candidates will only be able to start
                    the assessment between the configured
                    start and end date/time.
                  </p>

                </div>

              </div>

            </section>

            {/* ACTIONS */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">

              <button
                onClick={() =>
                  setShowCancelModal(true)
                }
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-red-400/15 bg-red-400/[0.04] px-5 text-sm font-bold text-red-300 transition hover:bg-red-400/[0.08]"
              >
                <X size={16} />
                Cancel Assessment
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-7 text-sm font-extrabold text-[#061018] transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={16} />

                {saving
                  ? "Saving..."
                  : "Save Schedule"}
              </button>

            </div>

          </div>

          {/* RIGHT */}
          <aside className="space-y-6">

            {/* SUMMARY */}
            <div className="rounded-[24px] border border-white/[0.07] bg-[#0b1420]">

              <div className="border-b border-white/[0.06] px-5 py-4">

                <h3 className="text-sm font-extrabold">
                  Schedule Preview
                </h3>

              </div>

              <div className="p-5">

                {/* START */}
                <div className="flex gap-4">

                  <div className="flex flex-col items-center">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10">
                      <CalendarDays
                        size={16}
                        className="text-emerald-400"
                      />
                    </div>

                    <div className="mt-2 h-12 w-px border-l border-dashed border-white/[0.1]" />

                  </div>

                  <div className="pt-1">

                    <p className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                      Starts
                    </p>

                    <p className="mt-1 text-sm font-bold text-white">
                      {formatDate(startDate)}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {formatTime(startTime)}
                    </p>

                  </div>

                </div>

                {/* END */}
                <div className="flex gap-4">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/10">
                    <CalendarDays
                      size={16}
                      className="text-amber-400"
                    />
                  </div>

                  <div className="pt-1">

                    <p className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                      Ends
                    </p>

                    <p className="mt-1 text-sm font-bold text-white">
                      {formatDate(endDate)}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {formatTime(endTime)}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* WARNING */}
            <div className="rounded-[24px] border border-amber-400/10 bg-amber-400/[0.025] p-5">

              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-400/10">
                  <AlertTriangle
                    size={17}
                    className="text-amber-400"
                  />
                </div>

                <div>

                  <h3 className="text-sm font-bold text-amber-300">
                    Important
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Changing the schedule may affect
                    candidates who have already received
                    the assessment invitation.
                  </p>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </main>

      {/* ================================================= */}
      {/* CANCEL MODAL */}
      {/* ================================================= */}

      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">

          <div className="w-full max-w-[460px] rounded-[26px] border border-white/[0.08] bg-[#0d1722] p-6 shadow-2xl">

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-400/10">
                <ShieldAlert
                  size={21}
                  className="text-red-400"
                />
              </div>

              <div>

                <h2 className="text-lg font-extrabold">
                  Cancel Assessment?
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Are you sure you want to cancel{" "}
                  <span className="font-bold text-slate-300">
                    {assessment.title}
                  </span>
                  ? Candidates will no longer be able
                  to access this assessment.
                </p>

              </div>

            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                onClick={() =>
                  setShowCancelModal(false)
                }
                className="h-11 rounded-xl border border-white/[0.08] px-5 text-sm font-bold text-slate-400 transition hover:bg-white/[0.04] hover:text-white"
              >
                Keep Assessment
              </button>

              <button
                onClick={handleCancelAssessment}
                className="h-11 rounded-xl bg-red-400 px-5 text-sm font-extrabold text-[#180606] transition hover:bg-red-300"
              >
                Yes, Cancel Assessment
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

// =====================================================
// INFO BOX
// =====================================================

function InfoBox({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#101a28] p-4">

      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/[0.06] text-cyan-400">
        {icon}
      </div>

      <p className="text-[9px] font-black uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-lg font-black text-slate-200">
        {value}
      </p>

    </div>
  );
}

// =====================================================
// DATE FIELD
// =====================================================

function DateField({
  label,
  value,
  onChange,
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-600">
        {label}
      </span>

      <div className="relative">

        <CalendarDays
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
        />

        <input
          type="date"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#101a28] pl-11 pr-4 text-sm font-semibold text-slate-300 outline-none transition [color-scheme:dark] focus:border-cyan-400/30 focus:ring-4 focus:ring-cyan-400/[0.05]"
        />

      </div>

    </label>
  );
}

// =====================================================
// TIME FIELD
// =====================================================

function TimeField({
  label,
  value,
  onChange,
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-600">
        {label}
      </span>

      <div className="relative">

        <Clock3
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
        />

        <input
          type="time"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#101a28] pl-11 pr-4 text-sm font-semibold text-slate-300 outline-none transition [color-scheme:dark] focus:border-cyan-400/30 focus:ring-4 focus:ring-cyan-400/[0.05]"
        />

      </div>

    </label>
  );
}

// =====================================================
// DATE FORMAT
// =====================================================

function formatDate(date) {
  if (!date) return "Not set";

  const [year, month, day] = date
    .split("-")
    .map(Number);

  const formatted = new Date(
    Date.UTC(year, month - 1, day)
  );

  return formatted.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

// =====================================================
// TIME FORMAT
// =====================================================

function formatTime(time) {
  if (!time) return "Not set";

  const [hours, minutes] = time
    .split(":")
    .map(Number);

  const suffix = hours >= 12 ? "PM" : "AM";

  const hour12 = hours % 12 || 12;

  return `${hour12}:${String(minutes).padStart(
    2,
    "0"
  )} ${suffix}`;
}