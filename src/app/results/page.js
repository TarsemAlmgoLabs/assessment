
// import AssessmentResult from "../components/submission"
// export default function Result(){
//     return(
//         <AssessmentResult/>
//     )
// }

import { Suspense } from "react";
import AssessmentResult from "../components/submission";

export default function Result() {
  return (
    <Suspense fallback={<div>Loading results...</div>}>
      <AssessmentResult />
    </Suspense>
  );
}