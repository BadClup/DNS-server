// this file is something like npm scripts

const {exec:e} = require('shelljs'),
    path = require('path'),
    fs = require('fs');



const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')).toString())
if (!config.built) {
    e(`cd ${path.join(__dirname, 'server')} && npm i`);
    e(`cd ${path.join(__dirname, 'client')} && npm i && cd ..`);

    fs.appendFile(path.join(__dirname, 'mongodb-login'), 'replace this text with your mongoDB login', () => {
        //useless callback ;)
    })

    config.built = true

    fs.writeFile(path.join(__dirname, 'config.json'), JSON.stringify(config),err => {
        if (err){
            console.log('error writing config.json', err);
        }
    })
    console.log('\x1b[31m', 'Please paste your mongoDB connection url into /DNS-server/mongodb-login file', '\x1b[0m')
    return;
}

setTimeout(() => {
    e(`concurrently --kill-others \"node ${path.join(__dirname, 'server', 'server.js')}\" \"node ${path.join(__dirname, 'client', 'server.js\"')}`)
}, 0)