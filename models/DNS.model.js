const dnsPacket = require("dns-packet"),
    GUN = require('gun');

    const gun = GUN({web: require('../HTTPserver').httpServer});
    gun.get('domains').get('test.badclup').get('ipv4').on(console.log);


/*const gunServer = function (opt) {
    if (typeof gun == 'undefined') {
        console.log('test1');
        const gun = GUN(opt)
}
    //test data:
    if(typeof gun != 'undefined') {
        console.log('test:', typeof gun)

        gun
            .get('domains')
            .get('test.badclup')
            .get('ipv4')
            .put('127.0.0.1');
    }
}
    */

const msgToName = function(msg){
    return msg.questions[0].name.split('.').slice(-2).join('.').toLowerCase();
}

const resolverModel = function(msg, options) {
    msg = msgToName(msg);

    // default type of requested ip:
    if(options.ipType == 'undefined'){
        options.ipType = 'ipv4'
    }

    gun.get('domains')
        .get(msg)
        .get(options.ipType === 'ipv4' || options.ipType === 'ipv6'? options.ipType : () => { throw 'error'})
        .once(data => msg = data);

    return msg;
}


const responseModel = function(msg, options){
    if(options.ip == 'undefined') {
        options.ip = 'ipv4';
    }

    return dnsPacket.encode({
        id: msg.id,
        type: 'response',
        opcode: 'QUERY',
        rcode: 'NOERROR',
        questions: msg.questions,
        answers: [
            {
                name: msgToName(msg),
                type: msg.questions[0].type,
                ttl: 300,
                class: msg.questions[0].class,
                flush: false,
                data: options.ip
            }
        ],
        authorities: [],
        additionals: []
    });
}


module.exports = {
    gunModel: gun,
    //startGunServer: gunServer,
    resolverModel: resolverModel,
    responseModel: responseModel
}