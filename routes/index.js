const user = require('./user')
const product = require('./product')

const routes = (app) => {
    app.use('/user', user)
    app.use('/product', product)
}

module.exports = routes