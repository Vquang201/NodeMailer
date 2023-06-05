const AppController = require('../controller/AppController')


const router = require('express').Router()

router.post('/getbill', AppController.getBill)

module.exports = router