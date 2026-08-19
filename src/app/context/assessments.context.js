// context/AppContext.jsx

'use client'
import { createContext, useContext, useState } from "react";
import axios from 'axios'
const AppContext = createContext();
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
export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [Assessments, setAssessments] = useState([]);
  const [FilterAssessments, setFilterAssessments] = useState([]);

  const [authenticated, setAuthenticated] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [userData, setUserData] = useState({
    fname : "tarsem",
    tier : "gold",
    email : "ts6346298@gmail.com"
  })

  const Authentication = async()=>{
    try{
      // const response = await axios.get("/api/authentication");

      // console.log(response.data);
      setAuthenticated(authenticated=> true);
      setUserData((userData) => ({
        ...userData,
        fname: "tarsem",
        email: "ts6346298@gmail.com",
      }));
    }catch(error){
      console.error("Failed to fetch assessments:", error);

    }
  }

  const Authorization = async()=>{
    try{
      // const response = await axios.get("/api/authorization");

      // console.log(response.data);
      setUserData((userData) => ({
        ...userData,
        tier : "gold",
      }));
      setAuthorized(authorized=> true);
    }catch(error){
      console.error("Failed to fetch assessments:", error);

    }
  }

  const fetchAssessments = async () => {
    try {
      // const response = await axios.get("/api/assessments");

      // console.log(response.data);
      setAssessments(Assessments=> assessments);
      setFilterAssessments(filterAssessments=> assessments)
      return assessments;
    } catch (error) {
      console.error("Failed to fetch assessments:", error);
    }
  };

  const filterAssessmentsFun = async(assessments, text)=>{
    const newAssessments = assessments.filter(el=>{
      if(el.title.toLowerCase().includes(text.toLowerCase())){
        return el;
      }
    })

    setFilterAssessments(FilterAssessments=> newAssessments);
  }

  const value = {
    loading,
    setLoading,
    Assessments,
    fetchAssessments,
    Authentication,
    Authorization,
    authenticated,
    authorized,
    userData,
    FilterAssessments,
    filterAssessmentsFun
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const AssessmentContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
};