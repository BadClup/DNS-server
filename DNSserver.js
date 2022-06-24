module.exports = function DNS() {

    const dgram = require('dgram'),

        dnsPacket = require('dns-packet'),

        dnsModel = require('./models/DNS.model'),

        socket = dgram.createSocket('udp4');


    socket.on('message', async (message, rinfo) => {
        const msg = dnsPacket.decode(message)
        const response = dnsModel.responseModel(msg, {
            ip: dnsModel.resolverModel(msg, {
                ipType: 'ipv4'// TODO: dynamic ipType
            })
        });

        console.log('response', dnsPacket.decode(response));


        socket.send(response, rinfo.port, rinfo.address, (err) => {
            err?
                 console.error(err) :
                 console.log('data sent!');
        })

        console.log("response:", JSON.stringify(message));
    })


    socket.bind(53,undefined , () => {
        console.log('dgram is working on port: 53')
    });
}