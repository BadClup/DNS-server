// this file is something like npm scripts

const {exec:e} = require('shelljs'),
    path = require('path'),
    fs = require('fs');


if (!fs.existsSync('mongodb-login')) {
    fs.appendFile('mongodb-login', 'replace this text with your mongoDB login', () => {
        console.log('mongodb-login file created')
    })
}

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')).toString())
if (!config.built) {
    e(`cd ${path.join(__dirname, 'server')} && npm i`);
    e(`cd ${path.join(__dirname, 'client')} && npm i && cd ..`);

    config.built = true

    fs.writeFile(path.join(__dirname, 'config.json'), JSON.stringify(config),err => {
        if (err){
            console.log('error writing config.json', err);
        } else {
            console.log('Successfully built');
        }
    })
}

setTimeout(() => {
    e(`concurrently --kill-others \"node ${path.join(__dirname, 'server', 'server.js')}\" \"node ${path.join(__dirname, 'client', 'server.js\"')}`)
}, 0)