// import ManageAssessment from "../components/manage"

// export default function ManageAssessmentfun(){
//     return(
//         <ManageAssessment/>
//     )
// }

import { Suspense } from "react";
import ManageAssessment from "../components/manage";

export default function ManageAssessmentfun() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ManageAssessment />
    </Suspense>
  );
}