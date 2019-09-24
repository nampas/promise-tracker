describe('promise tracker', () => {

  const nativePromise = global.Promise;

  beforeEach(() => {
    jest.resetModules();
    global.Promise = nativePromise;
    require('./index');
  });

  it('tracks pending promises', () => {
    expect(Promise.getPendingPromises()).toBe(0);

    new Promise(() => null);
    expect(Promise.getPendingPromises()).toBe(1);
  });

  it('handles resolved promises', async() => {
    expect(Promise.getPendingPromises()).toBe(0);

    new Promise(() => null);
    await new Promise((resolve) => {
      expect(Promise.getPendingPromises()).toBe(2);
      // Make it async
      setTimeout(resolve, 0);
    });

    expect(Promise.getPendingPromises()).toBe(1);
  });

  it('handles rejected promises', async () => {
    expect(Promise.getPendingPromises()).toBe(0);

    new Promise(() => null);

    try {
      await new Promise((resolve, reject) => {
        expect(Promise.getPendingPromises()).toBe(2);
        setTimeout(reject, 0);
      });
    } catch (_error) {
      // Yep
    }

    expect(Promise.getPendingPromises()).toBe(1);
  });
});
