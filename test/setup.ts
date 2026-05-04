afterAll(async () => {
  if (global.gc) {
    global.gc();
  }
});
