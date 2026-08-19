'use client'
import React, { useEffect } from "react";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Code2,
  FileText,
  Gauge,
  Lock,
  Play,
  ShieldCheck,
  Users,
  Search
} from "lucide-react";
import Link from "next/link";
import { AssessmentContext } from "../context/assessments.context";

const assessments = [
  {
    id: 1,
    title: "JavaScript Assessment",
    description:
      "Test your knowledge of JavaScript fundamentals, ES6+, async programming and modern patterns.",
    category: "Frontend",
    duration: "30 min",
    questions: 30,
    experience: "1-2 year",
    icon: Code2,
    status: "Available",
  },
  {
    id: 2,
    title: "React.js Assessment",
    description:
      "Evaluate your React skills including hooks, state management, components and performance.",
    category: "Frontend",
    duration: "35 min",
    questions: 35,
    experience: "1-2 year",
    icon: BrainCircuit,
    status: "Available",
  },
  {
    id: 3,
    title: "Node.js & Express",
    description:
      "Demonstrate your backend expertise with Node.js, Express, APIs, middleware and architecture.",
    category: "Backend",
    duration: "40 min",
    questions: 40,
    experience: "1-2 year",
    icon: Gauge,
    status: "Available",
  },
  {
    id: 4,
    title: "MongoDB Assessment",
    description:
      "Test database design, aggregation, indexing, queries and MongoDB best practices.",
    category: "Database",
    duration: "25 min",
    questions: 25,
    experience: "1-2 year",
    icon: FileText,
    status: "Available",
  },
  {
    id: 5,
    title: "Problem Solving & DSA",
    description:
      "Solve algorithmic problems covering arrays, strings, trees, graphs and optimization.",
    category: "Algorithms",
    duration: "60 min",
    questions: 20,
    experience: "1-2 year",
    icon: BrainCircuit,
    status: "Available",
  },
  {
    id: 6,
    title: "Communication Skills",
    description:
      "Assess your professional communication, workplace collaboration and problem explanation.",
    category: "Soft Skills",
    duration: "20 min",
    questions: 20,
    experience: "1-2 year",
    icon: Users,
    status: "Available",
  },
];



function AssessmentCard({ assessment }) {
  const Icon = assessment.icon;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#101725] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.12)]">
        
      
      {/* Top Glow */}
      <div className="absolute left-0 top-0 h-px w-24 bg-gradient-to-r from-cyan-400 to-transparent" />

      {/* Background Glow */}
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-cyan-400/5 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/10" />

      {/* Header */}
      <div className="relative flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
          <Icon size={23} />
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-[11px] font-semibold text-yellow-400 bg-yellow-400/10 border-yellow-400/20`}
        >
          {assessment.experience}
        </span>
      </div>

      {/* Content */}
      <div className="relative mt-5">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400">
          {assessment.category}
        </div>

        <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-300">
          {assessment.title}
        </h3>

        <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">
          {assessment.description}
        </p>
      </div>

     <div className="mt-6">
      <p className="mb-3 text-sm font-semibold text-slate-400">
        Skills Required
      </p>

      <div className="flex flex-wrap gap-2">
        {assessment.skills?.map((skill, index) => (
          <div
            key={index}
            className="
              rounded-lg
              border border-cyan-400/15
              bg-cyan-400/[0.06]
              px-3 py-1.5
              text-xs font-semibold
              text-cyan-300
              transition-all duration-200
              hover:border-cyan-400/30
              hover:bg-cyan-400/10
            "
          >
            {skill}
          </div>
        ))}
      </div>
    </div>

      {/* Stats */}
      <div className="relative mt-5 flex items-center gap-5 border-t border-white/5 pt-4">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Clock3 size={16} className="text-cyan-400" />
          {assessment.duration}
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <FileText size={16} className="text-cyan-400" />
          {assessment.questions} Questions
        </div>
      </div>

      {/* Button */}
      <Link
        href={`/desclaimers?title=${assessment.title}&exp=${assessment.experience.split("year")[0]}&skills=${assessment.skills.join(",")}&assessmentId=${assessment._id}}`}
        disabled={assessment.status !== "Available"}
        className="relative mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 py-3 text-sm font-bold text-cyan-300 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-400 hover:text-[#071118] hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/5 disabled:text-slate-500 cursor-pointer"
      >
        {assessment.status === "Available" ? (
          <>
            <Play size={16} fill="currentColor" />
            Start Assessment
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1 cursor-pointer"
            />
          </>
        ) : assessment.status === "Completed" ? (
          <>
            <CheckCircle2 size={16} />
            Completed
          </>
        ) : (
          <>
            <Lock size={16} />
            Locked
          </>
        )}
      </Link>
    </div>
  );
}

export default function CandidateAssessments() {

  const {
    loading,
    setLoading,
    Assessments,
    fetchAssessments,
    userData,
    FilterAssessments,
    filterAssessmentsFun
    
  } = AssessmentContext();

  useEffect(el=>{
    fetchAssessments()
  },[])

  function onSearch(el){
    filterAssessmentsFun(Assessments, el.target.value)
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0b1016] px-6 py-16 text-white md:px-10 lg:px-16">
        <Link
            href="/history"
            className="
                fixed right-5 top-5 z-50
                rounded-xl border border-white/[0.08]
                bg-[#0d141e]/95
                px-4 py-2.5
                text-xs font-semibold text-slate-300
                shadow-lg shadow-black/20
                backdrop-blur-xl
                transition-all duration-200
                hover:border-cyan-400/30
                hover:bg-cyan-400/10
                hover:text-cyan-300
                sm:right-8 sm:top-6
            "
            >
            Old Assessments
        </Link>

       <button
        className="
          fixed left-6 top-6 z-50
          rounded-xl
          border border-yellow-400/30
          bg-gradient-to-r from-yellow-500/20 to-amber-400/10
          px-4 py-2.5
          text-xs font-bold text-yellow-300
          shadow-lg shadow-yellow-500/10
          backdrop-blur-xl
          transition-all duration-200
          hover:border-yellow-400/60
          hover:bg-yellow-400/20
          hover:text-yellow-200
          hover:shadow-yellow-500/20
        "
      >
        {userData.tier.toUpperCase()} USER
      </button>

      {/* Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "45px 45px",
        }}
      />

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-cyan-400/20 bg-cyan-400/10 px-4 py-2">
            <ShieldCheck size={15} className="text-cyan-400" />

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
              Candidate Assessments
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Available Assessments
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
            Showcase your skills and get verified by completing assessments
            designed for real-world IT roles.
          </p>

          {/* Stats */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">

            {/* <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-400">
              <span className="font-bold text-white">
                {Assessments.length}
              </span>{" "}
              Assessments
            </div> */}

            {/* <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-400">
              <span className="font-bold text-cyan-400">5</span> Skills
            </div> */}

            <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-400">
              Verified by VeStaff
            </div>

          </div>
        </div>

        {/* Assessment Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="mb-5 flex w-full max-w-md items-center gap-2 rounded-xl border border-white/10 bg-[#172231] px-3 py-2.5 shadow-lg shadow-black/20 ring-1 ring-white/[0.02] col-span-3">
            <Search size={17} className="shrink-0 text-cyan-400" />

            <input
                onChange={el=> onSearch(el)}
                type="text"
                placeholder="Search assessments..."
                className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
            />
            </div>
          {FilterAssessments.map((assessment) => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
            />
          ))}
        </div>

      </div>
    </section>
  );
}