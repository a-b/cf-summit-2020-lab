const { v4: uuidv4 } = require('uuid')
const http = require('http')
// const port = process.env.PORT || 4001

let uuid = uuidv4()
if ( process.env.VCAP_APPLICATION) {
    var app_info = JSON.parse( process.env.VCAP_APPLICATION )
    //This is super hacky, but was done because we could not get the application uri to load from
    //the worker process
    cfApi = app_info.cf_api;
    host = cfApi.replace("https://api", app_info.application_name)
    console.log("HOST: " + host)
}
else{
    host = "localhost"
}

let i = 0
console.log("DISCOVERaBLE THING: " + process.env.application_uris)
setInterval(() => {
    http.get({
        hostname: host,
        path: `/register_worker?uuid=${uuid}`
    }, (res) => {
        console.log('Doing busy work (' + uuid + '): ', res.statusCode, ' - ', i++)
    });
}, 2000)
