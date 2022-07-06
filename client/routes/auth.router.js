const path = require('path'),

    express = require('express'),

    accounts = require('../models/mongodb.model');


const login = express.Router()
login.route('/')
    .post((req, res) => {
        const body = req.body;

        accounts.findOne({
            name: body.login,
            password: body.password
        })
            .then(data => {
                if (data) {
                    res.status(200).json({
                        status: 200,
                        areLoggedIn:true
                    })
                } else {
                    res.status(400).json({
                        error: "bad login or password",
                        status: 400,
                        areLoggedIn: false
                    })
                }
            })
    })

module.exports = {
    login
}