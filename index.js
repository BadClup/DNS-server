const dgram = require('dgram'),
    server = dgram.createSocket('udp4'),
    dnsPacket = require('dns-packet');


server.on('message', (message, rinfo) => {
    const msg = dnsPacket.decode(message);
    //console.log(msg);
    if (msg.questions[0].name === 'test.badclup') {
        console.log(msg.questions[0].name)
        const response = dnsPacket.encode({
            id: msg.id,
            type: 'response',
            opcode: 'QUERY',
            rcode: 'NOERROR',
            questions: msg.questions,
            answers: [
                {
                    name: msg.questions[0].name,
                    type: msg.questions[0].type,
                    ttl: 300,
                    class: msg.questions[0].class,
                    flush: false,
                    data: '127.0.0.1'
                }
            ],
            authorities: [],
            additionals: []
        });
        console.log('response', dnsPacket.decode(response));
        server.send(response, rinfo.port, rinfo.address, (err) => {
            err?
                server.close() :
                console.log('data sent!');
        })
    }
})


server.bind(53);
