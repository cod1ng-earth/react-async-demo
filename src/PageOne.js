import React, {Suspense} from 'react';
import { aVeryHeavyAsyncApiCall } from './api';

function ShowApiResult({resource}) {
  const apiResult = resource.read();
  return <div>{apiResult}</div>
}

function PageOne() {
  return (
    <div>
      Hi Im Page 1
      <Suspense fallback={<div>waiting......</div>}>
        <ShowApiResult resource={aVeryHeavyAsyncApiCall(3000)} />
      </Suspense>
    </div>
  );
}

export default PageOne;
