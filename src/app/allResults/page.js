// import TestResults from "../components/allResults"
// export default function Allresults(){
//     return(
//         <TestResults/>
//     )
// }

import { Suspense } from "react";
import TestResults from "../components/allResults";

export default function Allresults() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestResults />
    </Suspense>
  );
}