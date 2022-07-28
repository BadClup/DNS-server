const fs = require('fs'),
    path = require('path');

const argv = process.argv.slice(2);

if (argv.length === 2) {
    const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')).toString());
    config.dbUrl = `mongodb+srv://${argv[0]}:${argv[1]}@dns.lezts.mongodb.net/?retryWrites=true&w=majority`;
    fs.writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify(config));
    console.log(config)
} else {
    console.log('wrong syntax');
}