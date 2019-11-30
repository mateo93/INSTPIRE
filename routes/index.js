'use strict'

const express = require('express')
const scraper = require('../controllers/scraper')
const api = express.Router()

api.post('/perfil', scraper.perfil)
api.post('/query', scraper.query)
module.exports = api