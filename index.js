const server = require('./HTTPserver'),
    DNS = require('./DNSserver'),
    dnsModel = require('./models/DNS.model'),

    PORT = process.env.PORT || 8080;



    dnsModel.startGunServer({web: server.httpServer});
    DNS();



server.httpServer.listen(PORT, () => {
    console.log(`server is listening on port: ${PORT}`)
});