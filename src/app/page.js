// 'use client'
// import Image from "next/image";
// import CandidateAssessments from "./components/landing";
// import { AssessmentContext } from "./context/assessments.context";
// import { useEffect } from "react";


// export default function Home() {

//     const {
//       Authentication,
//       Authorization,
//       authenticated,
//       authorized,
//       userData
//     } = AssessmentContext();

//     useEffect(el=>{
//       Authentication();
//       Authorization();
//     }, [])

//     useEffect(() => {
//     if (authenticated === false) {
//       window.location.href = "https://vestaff.com";
//       }
//     }, [authenticated]);

//     if (authenticated === false) {
//       return null;
//     }

//   return (
//       <CandidateAssessments/>
//   );
// }
"use client";

import CandidateAssessments from "./components/landing";
import { AssessmentContext } from "./context/assessments.context";
import { useEffect, useState } from "react";

export default function Home() {
  const {
    Authentication,
    Authorization,
    authenticated,
    authorized,
  } = AssessmentContext();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const isAuthenticated = await Authentication();

        if (!isAuthenticated) {
          return;
        }

        await Authorization();
      } finally {
        setChecking(false);
      }
    };

    checkUser();
  }, []);

  // Auth + Authorization check hone tak kuch render mat karo
  if (checking) {
    return null;
  }

  // Authentication fail
  if (authenticated === false) {
    // window.location.href = "https://vestaff.com/auth/login";
    return null;
  }

  return <CandidateAssessments />;
}