const axios = require('axios');

const rpm = 500;
const delay = (60 * 1000)/ rpm;
let requestCounter = rpm;
let requestDoneCounter = rpm;
let errors = 0;

const startTime = Date.now();

const getFibonacciResult = async (counter) => {
    const res = await axios.get('http://localhost:3000?n=37&useThreads=true').catch(onError);
    console.log('requests done:', rpm - requestDoneCounter);
    requestDoneCounter--;
    console.log(counter, ' || ', res.data);
    requestDoneCounter === 1 && console.log(`took ${Date.now() - startTime} ms with ${errors} errors` );
}

const onError = () => {
    errors++;
    return {data: 'error'}
}

const fire = () => {
    if (!requestCounter) {
        return;
    }
    getFibonacciResult(requestCounter);
    requestCounter--;
    setTimeout(fire, delay);
}

fire();