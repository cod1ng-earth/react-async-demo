import React, {useEffect, useState} from 'react';

function aVeryHeavyAsyncApiCall(thatRunsForMilliSeconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("hey, Im done!"), thatRunsForMilliSeconds);
  })
}

function PageOne() {
  const [apiResult, setApiResult] = useState();

  useEffect(() => {
    let mounted = true;
    aVeryHeavyAsyncApiCall(3000).then(result => {
      mounted && setApiResult(result)
      if (!mounted) {
        console.debug("oh page 1 is already dead 💀")
      }
    })
    return () => mounted = false;
  }, []) 

  return (
    <div>
      Hi Im Page 1
      {apiResult ? <div>{apiResult}</div> : <div>waiting......</div>}
    </div>
  );
}

export default PageOne;
