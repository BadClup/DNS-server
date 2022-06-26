const dgram = require('dgram'),

    dnsPacket = require('dns-packet'),
    GUN = require('gun/gun'),

    dnsModel = require('./models/DNS.model'),

    socket = dgram.createSocket('udp4'),
    gun = GUN({peers: ['http://localhost:8080/gun']});

    gun.get('domains').get('test.badclup').get('ipv4').on(console.log);




socket.on('message', (message, rinfo) => {
    const msg = dnsPacket.decode(message),
        domainAddress = msg.questions[0].name.split('.').slice(-2).join('.').toLowerCase();

    if (domainAddress === 'test.badclup'){
        console.log(domainAddress);
    }


    let ipType = 'ipv4';
    if(ipType == 'undefined'){
        ipType = 'ipv4'     // TODO: dynamic ipType;
    }


    new Promise((resolve, reject) => {
        gun.get('domains').once(console.log)
        gun.get('domains')
            .get(domainAddress)
            //.get(ipType === 'ipv4' || ipType === 'ipv6'? ipType : () => { throw 'error'})
            .get('ipv4')
            .once(data => {
                if (data) {
                    console.log(data);
                    resolve(data);
                } else {
                    console.log(data)
                    reject(data);
                }
            });
    })
        .then(data => {
            console.log(data);
            socket.send(dnsModel.responseModel(msg, {ip: data}, rinfo.port, rinfo.address, err => {
                err ?
                    console.error(err) :
                    console.log('data sent:', data);
            }))
        }).catch(socket.close)
})



socket.bind(53,undefined , () => {
    console.log('dgram is working on port: 53')
})