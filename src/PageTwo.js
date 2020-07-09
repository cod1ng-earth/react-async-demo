import React from 'react';
import Async from "react-async"

function aVeryHeavyAsyncApiCall({thatRunsForMilliSeconds}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`hey, I ran ${thatRunsForMilliSeconds}ms!`), thatRunsForMilliSeconds);
  })
}

function PageTwo() {
  
  return (
    <div>
      Hi Im Page 2
      <Async promiseFn={aVeryHeavyAsyncApiCall} thatRunsForMilliSeconds={3000}>
        <Async.Pending>
          <div>waiting......</div>
        </Async.Pending>
        <Async.Fulfilled>
          {data => (
            <div>{data}</div>
          )}
        </Async.Fulfilled>
      </Async>
    </div>
  );
}

export default PageTwo;