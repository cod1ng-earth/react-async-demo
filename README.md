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

# react async solution

comes with lots of options how to express yourself: https://docs.react-async.com/getting-started/usage  
`PageOne`: demo with a `useAsync` hook  
`PageTwo`: demo with context based Async components  
(more in the docs)

React Async claims to be fully compatible to React Suspense / Concurrent React once it has landed.
