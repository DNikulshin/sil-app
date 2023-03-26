const express = require('express')
const fs = require('fs')
const path = require('path')
// const http = require('http')
const https = require('https')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')

const key = fs.readFileSync(path.resolve(__dirname, 'certs','private.key'))
const cert = fs.readFileSync(path.resolve(__dirname, 'certs','certificate.crt'))
const ca = fs.readFileSync(path.resolve(__dirname, 'certs','ca_bundle.crt'))


const options = {
    key: key,
    cert: cert,
    ca: ca
}

const app = express()

const PORT_HTTPS =process.env.PORT_HTTPS || 5556
const HOST_HTTPS = process.env.HOST_HTTPS || 'localhost'
// const PORT_HTTP =  process.env.PORT_HTTP || 5555
// const HOST_HTTP = process.env.HOST_HTTP || 'localhost'

// const PORT = process.env.PORT || 7777
// const HOST = process.env.HOST || 'localhost'


app.use(cors())
app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/claim', require('./routes/claim.routes'))

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('/.well-known/pki-validation/948E427FC1154A1D517751137485189E.txt', function (req, res, next) {
        res.sendFile(path.resolve(__dirname, 'static', '.well-known', 'pki-validation','948E427FC1154A1D517751137485189E.txt'))
    })

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

}


// const httpServer = http.createServer(app)
const httpsServer  = https.createServer(options, app)

async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        // httpServer.listen(PORT, HOST ,() => console.log(`App has been started host: http://${HOST}:${PORT}`))
        httpsServer.listen(PORT_HTTPS, HOST_HTTPS ,() => console.log(`App has been started host: https://${HOST_HTTPS}:${PORT_HTTPS}`))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()


