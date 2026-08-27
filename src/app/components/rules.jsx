"use client";
import Link from "next/link";
import { useEffect, useState, useRef} from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Flag,
  Info,
  ShieldCheck,
  Mic, Camera
} from "lucide-react";
import { AssessmentContext } from "../context/assessments.context";
import { useSearchParams } from "next/navigation";

export default function AssessmentRules() {

  const searchParams = useSearchParams();

  const title = searchParams.get("title");
  const exp = searchParams.get("exp");
  const skills = searchParams.get("skills")?.split(",") || [];
  const assessmentId = searchParams.get("assessmentId");

  const {testModeSet, testMode} = AssessmentContext()
  const [micEnabled, setMicEnabled] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);

  const micStreamRef = useRef(null);
  const cameraStreamRef = useRef(null);

  // function testModeSetfun(mode){
  //   testModeSet(mode)
  // }

  const handleMicrophone = async (checked) => {
    if (checked) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        micStreamRef.current = stream;
        setMicEnabled(true);
      } catch (error) {
        console.error("Microphone permission denied:", error);
        setMicEnabled(false);
      }
    } else {
      micStreamRef.current?.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
      setMicEnabled(false);
    }
  };

  const handleCamera = async (checked) => {
    if (checked) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        cameraStreamRef.current = stream;
        setCameraEnabled(true);
      } catch (error) {
        console.error("Camera permission denied:", error);
        setCameraEnabled(false);
      }
    } else {
      cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
      cameraStreamRef.current = null;
      setCameraEnabled(false);
    }
  };

  useEffect(() => {
    return () => {
      micStreamRef.current?.getTracks().forEach((track) => track.stop());
      cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  


  return (
    <div className="min-h-screen bg-[#080d13] text-white">

      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#0b1119]">
        <div className="mx-auto flex h-[68px] max-w-5xl items-center gap-3 px-4 sm:px-6">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/10 text-cyan-400">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h1 className="text-sm font-bold text-white sm:text-base">
              Rules & Regulations
            </h1>

            <p className="text-[11px] text-slate-500">
              VeStaff Candidate Assessment
            </p>
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">

        {/* Title */}
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-400">
            Before You Begin
          </p>

         <div className="mt-2 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Assessment Rules & Regulations
            </h2>

            {/* <div className="flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-[#0d141e] p-1">
              <span className="px-2 text-xs font-semibold text-slate-400 hidden sm:block">
                Test Mode
              </span>

              <button
                onClick={() => testModeSet("light")}
                type="button"
                className={
                  testMode === "light"
                    ? `
                      rounded-lg bg-cyan-400/15 px-3 py-2
                      text-xs font-semibold text-cyan-300
                      ring-1 ring-cyan-400/20
                    `
                    : `
                      rounded-lg px-3 py-2
                      text-xs font-semibold text-slate-300
                      transition-all duration-200
                      hover:bg-white/10 hover:text-white
                    `
                }
              >
                ☀ Light
              </button>

              <button
                onClick={() => testModeSet("dark")}
                type="button"
                className={
                  testMode === "dark"
                    ? `
                      rounded-lg bg-cyan-400/15 px-3 py-2
                      text-xs font-semibold text-cyan-300
                      ring-1 ring-cyan-400/20
                    `
                    : `
                      rounded-lg px-3 py-2
                      text-xs font-semibold text-slate-300
                      transition-all duration-200
                      hover:bg-white/10 hover:text-white
                    `
                }
              >
                ☾ Dark
              </button>
            </div> */}
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Please read the following instructions carefully before
            starting your assessment.
          </p>
        </div>

        {/* Assessment Info */}
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">

          <InfoCard
            icon={FileCheck2}
            label="Questions"
            value="30"
          />

          <InfoCard
            icon={Clock3}
            label="Duration"
            value="30 Minutes"
          />

          <InfoCard
            icon={CheckCircle2}
            label="Passing Score"
            value="60%"
          />

          <InfoCard
            icon={Flag}
            label="Attempts"
            value="1"
          />

        </div>

        {/* Rules */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d141e]">

          {/* Section Header */}
          <div className="flex items-center gap-3 border-b border-white/[0.06] p-5 sm:p-6">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
              <Info size={19} />
            </div>

            <div>
              <h3 className="font-bold text-white">
                General Instructions
              </h3>

              <p className="mt-0.5 text-xs text-slate-500">
                Important information about your assessment
              </p>
            </div>

          </div>

          <div className="divide-y divide-white/[0.05]">

            <Rule
              number="01"
              title="Read each question carefully"
              description="Make sure you understand the question and all available options before selecting your answer."
            />

            <Rule
              number="02"
              title="One answer per question"
              description="For multiple-choice questions, select the option you believe is the most appropriate answer."
            />

            <Rule
              number="03"
              title="Assessment timer"
              description="The assessment has a fixed duration. The timer will continue running once the assessment begins."
            />

            <Rule
              number="04"
              title="Do not refresh the page"
              description="Avoid refreshing, closing, or navigating away from the assessment window while the assessment is in progress."
            />

            <Rule
              number="05"
              title="Use of external resources"
              description="Do not use search engines, AI tools, external websites, or other unauthorized resources during the assessment."
            />

            <Rule
              number="06"
              title="Answer submission"
              description="Make sure you review your answers before submitting. Once the assessment is submitted, your answers cannot be changed."
            />

            <Rule
              number="07"
              title="Single attempt"
              description="Unless explicitly permitted by the assessment administrator, each assessment can only be attempted once."
            />

          </div>
        </section>

        {/* Important Notice */}
        <div className="mt-5 flex gap-3 rounded-xl border border-yellow-400/15 bg-yellow-400/[0.04] p-4">

          <AlertCircle
            size={19}
            className="mt-0.5 shrink-0 text-yellow-400"
          />

          <div>
            <p className="text-sm font-semibold text-yellow-300">
              Important
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Any attempt to use unauthorized assistance or
              resources may result in disqualification from the
              assessment.
            </p>
          </div>

        </div>

        {/* Agreement */}
        <div className="mt-5 rounded-2xl border border-white/[0.07] bg-[#0d141e] p-5 sm:p-6">

          <div className="flex items-start gap-3">

            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-cyan-400/30 bg-cyan-400/10">
              <CheckCircle2
                size={13}
                className="text-cyan-400"
              />
            </div>

            <p className="text-xs leading-5 text-slate-400">
              By starting this assessment, I confirm that I have
              read and understood the above rules and agree to
              follow them throughout the assessment.
            </p>

          </div>

        </div>

       <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {/* Microphone */}
      <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-[#0d141e] p-4 transition-all hover:border-cyan-400/30 hover:bg-cyan-400/5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
            <Mic size={20} />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Allow Microphone
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              {micEnabled ? "Microphone enabled" : "Required for assessment"}
            </p>
          </div>
        </div>

        <input
          type="checkbox"
          checked={micEnabled}
          onChange={(e) => handleMicrophone(e.target.checked)}
          className="h-5 w-5 cursor-pointer accent-cyan-400"
        />
      </label>

      {/* Camera */}
      <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-[#0d141e] p-4 transition-all hover:border-cyan-400/30 hover:bg-cyan-400/5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
            <Camera size={20} />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Allow Camera
            </p>

            <p className="mt-0.5 text-xs text-slate-500">
              {cameraEnabled ? "Camera enabled" : "Required for proctoring"}
            </p>
          </div>
        </div>

        <input
          type="checkbox"
          checked={cameraEnabled}
          onChange={(e) => handleCamera(e.target.checked)}
          className="h-5 w-5 cursor-pointer accent-cyan-400"
        />
      </label>
    </div>
        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">

          <Link
            href="/"
            className="
              flex items-center justify-center gap-2
              rounded-xl border border-white/[0.08]
              bg-[#0d141e] px-6 py-3
              text-sm font-semibold text-slate-400
              transition-all
              hover:bg-[#111a25]
              hover:text-white
            "
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          {/* Check if both are enabled */}
          {micEnabled && cameraEnabled ? (
            <Link
              href={`/assessment-portal?title=${encodeURIComponent(title)}&exp=${encodeURIComponent(exp)}&skills=${encodeURIComponent(skills.join(","))}&assessmentId=${encodeURIComponent(assessmentId)}`}
              className="
                flex items-center justify-center gap-2
                rounded-xl bg-cyan-400
                px-7 py-3
                text-sm font-bold text-[#061016]
                shadow-[0_0_25px_rgba(34,211,238,0.12)]
                transition-all
                hover:bg-cyan-300 cursor-pointer
              "
            >
              I Understand, Start Assessment
              <CheckCircle2 size={17} />
            </Link>
          ) : (
            <button
              disabled
              className="
                flex items-center justify-center gap-2
                rounded-xl bg-slate-800/50
                px-7 py-3
                text-sm font-bold text-slate-500
                cursor-not-allowed
                transition-all
              "
            >
              Allow Mic & Camera to Start
              <CheckCircle2 size={17} opacity={0.5} />
            </button>
          )}

        </div>

      </main>
    </div>
  );
}

/* =========================================================
   RULE
========================================================= */

function Rule({
  number,
  title,
  description,
}) {
  return (
    <div className="flex gap-4 p-5 sm:p-6">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-[10px] font-bold text-cyan-400">
        {number}
      </div>

      <div className="min-w-0">
        <h4 className="text-sm font-semibold text-slate-200">
          {title}
        </h4>

        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

    </div>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#0d141e] p-4">

      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
        <Icon size={16} />
      </div>

      <p className="mt-3 text-[10px] uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold text-white">
        {value}
      </p>

    </div>
  );
}