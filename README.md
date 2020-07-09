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

# ReactN

`PageOne` uses a "global" state. That leads to a - more or less - nice side effect: the effect hook just keeps on running
and sets the global state even after you navigated back from that page. Added a datetime to demonstrate that the hook
is fired each time you navigate to the page. The effect is obviously triggered each time the component mounts. The tradeoff
should be clear: if the **first** call runs longer than the second one the newer state will be overridden by the older!
