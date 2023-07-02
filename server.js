const express = require('express');
const { StaticPool } = require('node-worker-threads-pool');

const app = express();

const filePath = __dirname + '/fibonacci-worker.js';
const pool = new StaticPool({
  size: 4,
  task: filePath,
});

app.get('/', async (req, res) => {
    const { n, useThreads } = req.query;
    if (useThreads) {
        console.log('thread');
        return res.send(`Fibonacci result for ${n} is ${await pool.exec(n)}`)
    }
    console.log('no thread');
    res.send(`Fibonacci result for ${n} is ${fibonacci(n)}`)
})

module.exports = {
    server: app
};

const fibonacci = (n) => (n < 2) ? 1 : (fibonacci(n - 2) + fibonacci(n - 1));