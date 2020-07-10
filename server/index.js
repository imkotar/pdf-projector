const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const config = require('./src/config/config')
const pdfRoute = require('./src/routes/pdf')
const upload = require('express-fileupload')

app.use(cors())
app.use(express.json())
app.use(upload())
app.use('/pdf', pdfRoute)

io.on('connection', (socket) => {
  socket.on('SOCKET', (msg) => {
    io.emit('SOCKET', msg)
  });
});

http.listen((config.port), () => console.log(`Server started on port ${config.port}`))