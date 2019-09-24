let pendingPromises = 0;

const createResolutionHandler = (handler) => {
  return (...args) => {
    --pendingPromises;
    handler(...args);
  };
};

const getContext = () => {
  // node
  if (typeof global !== 'undefined') return global;
  // browsers
  if (typeof window !== 'undefined') return window;
  // noop, this will get thrown out
  return {};
};

getContext().Promise = class Promise extends global.Promise {

  constructor(promiseHandler) {
    pendingPromises++;

    const interceptor = (resolve, reject) => {
      // Intercept calls to resolve and reject so that we can decrement our
      // counter. Then call through to the real handlers.
      promiseHandler(
        createResolutionHandler(resolve),
        createResolutionHandler(reject));
    };

    super(interceptor);
  }

  static getPendingPromises() {
    return pendingPromises;
  }
};
