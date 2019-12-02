'use strict'

const express = require('express')
const scraper = require('../controllers/scraper')
const api = express.Router()

api.post('/perfil', scraper.perfil)
api.post('/query', scraper.query)
api.post('/seguidores', scraper.seguidores)
module.exports = api