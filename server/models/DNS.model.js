const dnsPacket = require("dns-packet");

const resolverModel = function(msg, options) {

}


const responseModel = function(domainAddress, msg, ip){

    console.log("test-log" ,domainAddress, msg, ip);

    return dnsPacket.encode({
        id: msg.id,
        type: 'response',
        opcode: 'QUERY',
        rcode: 'NOERROR',
        questions: msg.questions,
        answers: [
            {
                name: domainAddress,
                type: msg.questions[0].type,
                ttl: 300,
                class: msg.questions[0].class,
                flush: false,
                data: ip
            }
        ],
        authorities: [],
        additionals: []
    });
}


module.exports = {
    resolverModel,
    responseModel
}