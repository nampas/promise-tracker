# Promises with Tracking

A promise monkeypatch to provide functionality to keep track of how many promises are still pending.

## Usage

Install it:

`yarn add promise-with-tracking` or `npm install promise-with-tracking`


Pull it into your app. Monkeypatching will happen when the module is evaluated, so import it near the entrypoint.

```javascript
import 'promise-with-tracking';
```

Check in on some promise counts in your app:

```javascript
if (Promise.getPendingPromises() > 0) {
  console.log(`Uh oh, something isn't done`);
} else {
  console.log(`All done`);
}
```

## But why?

It can be notoriously tricky to track down when promises haven't resolved, and if so why. This module is useful for giving you a sense of code chunks that you need to take a closer look at. Here are some use cases for `Promise.getPendingPromises()`:
- Call it before your lambda function finishes, log an error if it's greater than 0. You probably don't want to leak promises between invocations.
- Call it at the end of a nodejs cron script, to ensure that you've cleaned up correctly
- Call it periodically in an webapp, to keep an eye on memory leaks. If the number keeps going up until a restart, you may have a problem.

