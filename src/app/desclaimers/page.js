'use client'
import AssessmentRules from "../components/rules"
import { Suspense } from "react";
export default function Desclaimer(){
    return(
        <Suspense fallback={null}><AssessmentRules /></Suspense>
    )
}