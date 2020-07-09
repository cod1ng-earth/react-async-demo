# demo of the problem

- go to page one
- click on page 2 while we're "waiting" and stay there
- you'll see an error message in the console

## root cause

when the promise resolves the effect call will set the returned state on the components hook state.
That causes a rerender but the original dom root has gone already.
Since the state hasn't been removed since it had been captured by the effect, this leads to memory leaks.

## "natural" solution

take a note in the effect that you're currently mounted.
If you're unmounted the effects returned callback is called. Set the unmount state there.
Check in the promise resolution if we're already unmounted and dismiss the effect without changing state.

# React Suspense / Concurrent Mode

from: https://reactjs.org/docs/concurrent-mode-suspense.html#solving-race-conditions-with-suspense

> Again, notice that we’re not waiting for the response to set the state. It’s the other way around: we set the state (and start rendering) immediately after kicking off a request. As soon as we have more data, React “fills in” the content inside <Suspense> components. This code is very readable, but unlike the examples earlier, the Suspense version doesn’t suffer from race conditions. You might be wondering why. The answer is that in the Suspense version, we don’t have to think about time as much in our code. Our original code with race conditions needed to set the state at the right moment later, or otherwise it would be wrong. But with Suspense, we set the state immediately — so it’s harder to mess it up.

This is a highly **experimental** feature that changes the whole
idea of how the React render cycle works. It's actually a whole
new React ;)

## Boiled their example down to be as short as possible

- `index.js / package.json`: uses React in concurrent mode:  
  https://reactjs.org/docs/concurrent-mode-intro.html

- `api.js` wraps the "api" promise in a contract format that Suspense understands
  https://reactjs.org/docs/concurrent-mode-suspense.html#approach-3-render-as-you-fetch-using-suspense  
  https://codesandbox.io/s/infallible-feather-xjtbu?file=/src/index.js:1028-1062

- `PageOne` splits off a display component, wraps it with a `<Suspense>` boundary.  
  note hat there is no effect anymore (!)  
  you can replace the currently loaded subject with another call. `Suspense` will switch to loading again.

- you can add more Suspense boundaries to indicate and control loading states
