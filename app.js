'use strict'

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const api = require('./routes')

app.use(cors())
app.use(bodyParser.urlencoded({	extended: true }))
app.use(bodyParser.json())
app.use('/api', api)
app.use((req, res, next) => {
    res.status(404).send({ message: 'Route not found' });
});
module.exports = app