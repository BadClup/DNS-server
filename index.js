const server = require('./controllers/server.controller'),
    DNS = require('./controllers/dns.router'),
    dnsModel = require('./models/DNS.model'),

    PORT = process.env.PORT || 8080;

    dnsModel.startGunServer({web: server});
    DNS();

   /* gun.get('domains').get('chuj.szmata').put({
        ipv4: '192.168.31.136',
        type: '', // u - user, d - domain, ud - user und domain
        parent: 'test.badclup'
    });
    socket.on('message', (message, rinfo) => {
    const msg = dnsPacket.decode(message),
        domainName = msg.questions[0].name.toLowerCase().split('.').slice(-2).join('.');


    console.log(domainName);

    if (domainName === url) {

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
                    data: '192.168.31.136'
                }
            ],
            authorities: [],
            additionals: []
        });
        console.log('response', dnsPacket.decode(response));


        socket.send(response, rinfo.port, rinfo.address, (err) => {
            err?
                socket.close() :
                console.log('data sent!');
        })
        console.log("response:", JSON.stringify(message));
    }
})


socket.bind(53);
 */
server.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`)
});