const dgram = require('dgram'),
    fs = require('fs'),
    path = require('path'),

    dnsPacket = require('dns-packet'),
    mongodb = require('mongodb'),

    dnsModel = require('./models/DNS.model'),

    socket = dgram.createSocket('udp4'),
    { dbUrl } = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'config.json')).toString());

    let DNS;


mongodb.MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, result) => {
    if (err) throw err;
    DNS = result.db('DNS').collection('DNS');
    console.log('Successfully connected to database');

})



socket.on('message', (message, rinfo) => {
    const msg = dnsPacket.decode(message),
        domainAddress = msg.questions[0].name.split('.').slice(-2).join('.').toLowerCase();

    if (domainAddress === 'test.badclup'){
        console.log(domainAddress);
    }


    let ipType = 'ipv4'; // TODO: dynamic ipType;


    DNS.findOne({domain: domainAddress})
        .then(data => {

            if (data.ipv4 === undefined && data.ipv6 === undefined) {
                console.log('404 NOT FOUND', data)
                socket.close()
            } else {
                console.log(data)
                const ip = ipType === 'ipv4' ? data.ipv4 : data.ipv6;

                socket.send(dnsModel.responseModel(domainAddress, msg, ip), rinfo.port, rinfo.address, err => {
                    err ?
                        console.error(err) :
                        console.log('data sent:', data);
                })
            }
        })
})


socket.bind(53,undefined , () => {
    console.log('dgram is working on port: 53')
})