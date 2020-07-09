import React, {useState} from 'react';
import useAbortableEffect from './useAbortableEffect';

function aVeryHeavyAsyncApiCall(thatRunsForMilliSeconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("hey, Im done!"), thatRunsForMilliSeconds);
  })
}

function PageTwo() {
  const [apiResult, setApiResult] = useState();

  useAbortableEffect((status) => {
    aVeryHeavyAsyncApiCall(3000).then(result => {
      !status.aborted && setApiResult(result)
      if (status.aborted) {
        console.debug("oh, page 2 is already dead 💀")
      }
    })
  }, []) 

  return (
    <div>
      Hi Im Page 2
      {apiResult ? <div>{apiResult}</div> : <div>waiting......</div>}
    </div>
  );
}

export default PageTwo;
