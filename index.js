const dgram = require('dgram'),
    server = dgram.createSocket('udp4'),
    dnsPacket = require('dns-packet'),
    url = (process.env.URL || 'test.badclup').toLowerCase();


server.on('message', (message, rinfo) => {
    const msg = dnsPacket.decode(message),
        name = msg.questions[0].name.toLowerCase(),
        splitName = name.split('.'),

        domainName = splitName[0] === 'www'?
            splitName.slice(1).join('.'):
            name;


    console.log(msg.questions[0].name);

    if (domainName === url) {
        console.log(msg.questions[0].name)

        const response = dnsPacket.encode({
            id: msg.id,
            type: 'response',
            opcode: 'QUERY',
            rcode: 'NOERROR',
            questions: msg.questions,
            answers: [
                {
                    name: domainName,
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
