function waitSeconds(seconds = 3000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("3 seconds have passed");
    }, seconds); // 3000 milliseconds = 3 seconds
  });
}

export default waitSeconds;
