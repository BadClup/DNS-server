const server = require('./HTTPserver'),
    DNS = require('./DNSserver'),
    dnsModel = require('./models/DNS.model'),

    PORT = process.env.PORT || 8080;



    //dnsModel.startGunServer({web: server.httpServer});
    setTimeout(() => {DNS()}, 0)



server.httpServer.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`)
});