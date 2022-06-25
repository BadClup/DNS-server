const http = require('http'),
    path = require('path'),

    express = require('express'),
    testSiteRouter = require('./routes/testSite.router')

    app = express(),
    httpServer = http.createServer(app);



    //app.use(express.static(path.join(__dirname, '..', 'public')))
    app.use(testSiteRouter);

    /*
    app.get('/', (req, res) => {
        res.status(200).sendFile(path.join(__dirname, '..', 'public', 'test-site', 'index.html'))
    })
    */


    //TODO: code something here


module.exports = {
    httpServer,
    app
}