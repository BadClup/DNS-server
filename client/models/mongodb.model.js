const path = require('path'),
    fs = require('fs'),

    mongodb = require('mongodb'),

    dbUrl = fs.readFileSync(path.join(__dirname, '..', '..', 'mongodb-login')).toString();

    let ACCOUNTS;


mongodb.MongoClient.connect(dbUrl), { useNewUrlParser: true }, (err, result) => {
    if (err) throw err;
    ACCOUNTS = result.db('DNS').collection('ACCOUNTS')

    console.log('Connected to database')
};

module.exports = ACCOUNTS;