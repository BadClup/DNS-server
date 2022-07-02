const http = require('http'),

    express = require('express'),

    testSiteRouter = require('./routes/testSite.router'),

    app = express(),
    server = http.createServer(app),

    PORT = process.env.PORT || 80;


    app.use(testSiteRouter);



server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});