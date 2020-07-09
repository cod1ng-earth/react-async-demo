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

# AbortController

is a browser native API to signal long running requests to stop / take note when something should be aborted.  
works natively with the `fetch` API (compat e.g. to axios)  
allows you to abort your requests and possibly reject / throw

a React related article: https://medium.com/@selvaganesh93/how-to-clean-up-subscriptions-in-react-components-using-abortcontroller-72335f19b6f7  
official docs: https://developers.google.com/web/updates/2017/09/abortable-fetch
