export const makeCancelable = (promise) => {
    let hasCanceled_ = false;
  
    const wrappedPromise = new Promise((resolve, reject) => {
      // AFTER PROMISE RESOLVES (see following '.then()'!), check if the 
      // react element has unmount (meaning the cancel function was called). 
      // If so, just reject it
      promise.then(
        val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
        error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
      );
    });
  
    return {
      promise: wrappedPromise,
      cancel() {
        hasCanceled_ = true;
      },
    };
  };