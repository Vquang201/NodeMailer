const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 8000
const routes = require('./routes')

// middleware xử lý boby , gửi dữ liệu lên server từ form
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())


routes(app)

app.listen(PORT, () => {
    console.log('Sever is running ...')
}) 