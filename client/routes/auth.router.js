const express = require('express');

const login = express.Router()

login.route('/')
    .post((req, res) => {

    })

module.exports = {
    login
}