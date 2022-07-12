const path = require('path'),

    express = require('express'),

    mongoModel = require('../models/mongodb.model');
const {error} = require("shelljs");


const login = new express.Router()
login.route('/')
    .post((req, res) => {
        const body = req.body;

        console.log('findOne', mongoModel.ACCOUNTS.findOne);

        mongoModel.ACCOUNTS.findOne({
            _id: body.login,
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



const register = express.Router();
register.route('/')
    .post((req, res) => {
        const body = req.body,
            throwObject = {};

        try {

        if (body.login.slice('.').length !== 2) {
            res.status(400).json({
                error: 'Wrong login',
                status: 400,
                wasRegistered: false
            })
            throw throwObject;
        }

            mongoModel.ACCOUNTS.findOne({
                _id: body.login
            })
                .then(data => {
                    if(data){
                        res.status(400).json({
                            error: 'That username is taken',
                            status: 400,
                            wasRegistered: false
                        })
                        throw throwObject;
                    } else {
                        mongoModel.ACCOUNTS.insert({
                            _id: body.login,
                            password: body.password
                        })
                        res.status(201).json({
                            status: 201,
                            wasRegistered: true
                        })
                    }
                })

        } catch (err) {
            if (err !== throwObject) {
                res.status(400).json({
                    error: 'Not recognized error',
                    status: 400,
                    wasRegistered: false
                })
            }
        }

    })

module.exports = {
    login,
    register
}