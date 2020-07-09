import React, {useEffect, useState} from 'react';

function aVeryHeavyAsyncApiCall(thatRunsForMilliSeconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("hey, Im done!"), thatRunsForMilliSeconds);
  })
}

function PageOne() {
  const [apiResult, setApiResult] = useState();

  useEffect(() => {
    aVeryHeavyAsyncApiCall(3000).then(result => {
      setApiResult(result)
    })
  }, []) 

  return (
    <div>
      Hi Im Page 1
      {apiResult ? <div>{apiResult}</div> : <div>waiting......</div>}
    </div>
  );
}

export default PageOne;
