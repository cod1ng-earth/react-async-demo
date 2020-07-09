import {useEffect} from 'react';

// from https://www.debuggr.io/react-update-unmounted-component/#custom-useeffect

export default function useAbortableEffect(effect, dependencies) {
  const status = { // mutable status object
      aborted: false
  }; 
  useEffect(() => {
    // pass the mutable object to the effect callback
    // store the returned value for cleanup
    const cleanUpFn = effect(status);
    return () => {
      // mutate the object to signal the consumer
      // this effect is cleaning up
      status.aborted = true;
      if (typeof cleanUpFn === "function") {
        // run the cleanup function
        cleanUpFn();
      }
    };
  }, [effect, status]);
}