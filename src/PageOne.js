import React, {useEffect, useState} from 'react';

function aVeryHeavyAsyncApiCall(thatRunsForMilliSeconds, {signal}) {

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => resolve("hey, Im done!"), thatRunsForMilliSeconds);
    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
      reject("Someone aborted me! 😠")
      console.log("aborting the very long api request...")
    })
    
  })
}

function PageOne() {
  const [apiResult, setApiResult] = useState();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    (async () => {
      try {
        const result = await aVeryHeavyAsyncApiCall(3000, {signal});
        setApiResult(result)
      } catch(e) {
        console.log("Page one is 💀: ", e);
      }
    })();
    
    return function() {
      abortController.abort();
    }
  }, []) 

  return (
    <div>
      Hi Im Page 1
      {apiResult ? <div>{apiResult}</div> : <div>waiting......</div>}
    </div>
  );
}

export default PageOne;
