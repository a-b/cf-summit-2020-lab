const { v4: uuidv4 } = require('uuid');

let uuid = uuidv4();

let i = 0;

setInterval(() => {
    console.log('Doing busy work (' + uuid + '): ', i++);
}, 2000)
