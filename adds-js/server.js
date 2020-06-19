const express = require('express')
const app = express()
const port = process.env.ADDS_JS_PORT || 4000

app.get('/', (req, res) => res.send('{adds: 2}'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
