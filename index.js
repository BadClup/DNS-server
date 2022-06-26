// this file is something like npm scripts

const {exec:e} = require('shelljs'),
    path = require('path'),
    fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json').toString())
if (!config.built) {
    e('cd server && npm i && cd ..');
    e(`cd client && npm i && cd ..`);

    config.built = true

    fs.writeFile('./config.json', JSON.stringify(config),err => {
        if (err){
            console.log('error writing config.json', err);
        } else {
            console.log('Successfully built');
        }
    })
}

setTimeout(() => {
    e(`concurrently --kill-others \"node ${path.join('server', 'server.js')}\" \"node ${path.join('client', 'server.js\"')}`)
}, 0)