const { parentPort } = require("worker_threads");

const fibonacci = (n) => (n < 2) ? 1 : (fibonacci(n - 2) + fibonacci(n - 1));

parentPort.on('message', (n) => parentPort.postMessage(fibonacci(n)));