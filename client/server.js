const http = require('http'),

    express = require('express'),

    testSiteRouter = require('./routes/testSite.router'),
    authRouter = require('./routes/auth.router'),

    app = express(),
    server = http.createServer(app),

    PORT = process.env.PORT || 5000;

    app.use(express.json())

    app.use('/', testSiteRouter);
    app.use('/login', authRouter.login);



server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});