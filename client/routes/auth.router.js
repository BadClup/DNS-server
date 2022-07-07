const path = require('path'),

    express = require('express'),

    mongoModel = require('../models/mongodb.model');


const login = express.Router()
login.route('/')
    .post((req, res) => {
        const body = req.body;

        console.log('findOne', mongoModel.ACCOUNTS.findOne);

        mongoModel.ACCOUNTS.findOne({
            name: body.login,
            password: body.password
        })
            .then(data => {
                console.log('login-post', typeof req.body, req.body, req.body.login, data)
                if (data) {
                    res.status(200).json({
                        status: 200,
                        isLoggedIn:true
                    })
                } else {
                    res.status(400).json({
                        error: "bad login or password",
                        status: 400,
                        isLoggedIn: false
                    })
                }
            })
    })

module.exports = {
    login
}