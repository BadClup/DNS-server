const http = require('http'),

    express = require('express'),
    testSiteRouter = require('./routes/testSite.router'),
    GUN = require('gun'),

    app = express(),
    server = http.createServer(app),

    PORT = process.env.PORT || 8080;



    const gun = GUN({
        web: server,
    });

    app.use(testSiteRouter);

    gun
        .get('domains')
        .get('badclup')
        .get('ipv4')
        .on(console.log);

    //TODO: code something here;



server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});