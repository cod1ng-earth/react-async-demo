import React from 'react';
import { useAsync } from "react-async"

function aVeryHeavyAsyncApiCall({thatRunsForMilliSeconds}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`hey, I ran ${thatRunsForMilliSeconds}ms!`), thatRunsForMilliSeconds);
  })
}

function PageOne() {
  
  const { data: apiResult } = useAsync({ promiseFn: aVeryHeavyAsyncApiCall, thatRunsForMilliSeconds: 3000 })

  return (
    <div>
      Hi Im Page 1
      {apiResult ? <div>{apiResult}</div> : <div>waiting......</div>}
    </div>
  );
}

export default PageOne;
