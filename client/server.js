const http = require('http'),
    path = require('path'),
    fs = require('fs'),

    express = require('express'),
    mongodb = require('mongodb'),
    CORS = require('cors'),

    testSiteRouter = require('./routes/testSite.router'),
    authRouter = require('./routes/auth.router'),
    mongoModel = require('./models/mongodb.model'),
    { MongoClient } = mongodb,

    app = express(),
    server = http.createServer(app),
    dbUrl = fs.readFileSync(path.join(__dirname, '..', 'mongodb-login')).toString(),

    PORT = process.env.PORT || 5000;


try {
    MongoClient.connect(dbUrl, {useNewUrlParser: true}, (err, result) => {
        if (err) throw err;
        mongoModel.ACCOUNTS = result.db('DNS').collection('ACCOUNTS');
        console.log('Connected to database');
    });
} catch (err) {
    console.log('database error', err);
}


app.use(CORS());
app.use(express.json());

app.use('/', testSiteRouter);
app.use('/login', authRouter.login);
app.use('/register', authRouter.register);



server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});