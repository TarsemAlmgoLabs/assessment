import CBTExam from "../components/qPanel"
import { Suspense } from "react";
export default function Portal(){
    return(
        <Suspense fallback={null}><CBTExam /></Suspense>
    )
}

