'use strict'

const express = require('express')
const scraper = require('../controllers/scraper')
const api = express.Router()

api.get('/seguidores', scraper.seguidores)
module.exports = api