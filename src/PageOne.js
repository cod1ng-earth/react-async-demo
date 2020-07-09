import React, { useEffect,  useGlobal } from 'reactn'; 

function aVeryHeavyAsyncApiCall(thatRunsForMilliSeconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`hey, Im done! The time is ${new Date().toISOString()}`)
    }, thatRunsForMilliSeconds);
  })
}

function PageOne() {
  const [apiResult, setApiResult] = useGlobal('apiResult');

  useEffect(() => {
    aVeryHeavyAsyncApiCall(3000).then(result => {
      setApiResult(result);
    })
  }, [setApiResult]) 

  return (
    <div>
      Hi Im Page 1
      {apiResult ? <div>{apiResult}</div> : <div>waiting......</div>}
    </div>
  );
}

export default PageOne;
