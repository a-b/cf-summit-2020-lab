const express = require('express')
const app = express()
const port = process.env.ADDS_JS_PORT || 4000

const { v4: uuidv4 } = require('uuid');

app.get('/', (req, res) => res.send('{"adds": "2", "lemonade": "green", "uuid": "' + uuidv4() + '"}'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


// TODO: rewrite sidecar communications via the FS or local socket
// const fs = require('fs')
// var data = new Date().getTime() + ": OK\n";
// fs.appendFileSync('/tmp/daemon-test.txt', data);
