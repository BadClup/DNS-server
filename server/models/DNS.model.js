const dnsPacket = require("dns-packet");

let gun,
    domains;

const resolverModel = function(msg, options) {
    return
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
    gun,
    domains,
    resolverModel,
    responseModel
}