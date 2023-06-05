const AppController = require('../controller/AppController')

const router = require('express').Router()

router.post('/sigup', AppController.sigup)

module.exports = router
