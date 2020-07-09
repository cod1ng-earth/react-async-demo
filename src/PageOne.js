import React, {useEffect, useState} from 'react';
import { makeCancelable } from './CancellablePromise';

function aVeryHeavyAsyncApiCall(thatRunsForMilliSeconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("hey, Im done!"), thatRunsForMilliSeconds);
  })
}

function PageOne() {
  const [apiResult, setApiResult] = useState();

  useEffect(() => {
    const cancellablePromise = makeCancelable(aVeryHeavyAsyncApiCall(3000));
    
    cancellablePromise.promise.then((result)=>{
      setApiResult(result);
    }).catch(() => {
      console.log('woops!');
    });
    
    return () => cancellablePromise.cancel();
  }, [])

  return (
    <div>
      Hi Im Page 1
      {apiResult ? <div>{apiResult}</div> : <div>waiting......</div>}
    </div>
  );
}

export default PageOne;
