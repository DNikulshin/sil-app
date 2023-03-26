const puppeteer = require('puppeteer')
const fsSync = require('fs')
const path = require('path')
const { Auth, GetData } = require('../utils/service.http')
const settings = require('../utils/http.settings')
const setCookies = require('./setCookies')
require('dotenv').config()

async function startParse (URL, login ='', password ='', typeRequest = 'claim') {
    const browser = await puppeteer.launch(settings)
    const page = await browser.newPage()
    try {
        const pathCookie = path.resolve(__dirname, '..', 'cookies', `cookie-${login}.json`)

        if(!fsSync.existsSync(pathCookie)) {
            await Auth(page, login, password)
            const data = await GetData(page, URL, typeRequest)
                     await browser.close()
                     return data
        }
        const cookiesFile = fsSync.statSync(pathCookie)
        if(cookiesFile.size === 0) {
            await Auth(page, login, password)
            const data = await GetData(page, URL, typeRequest)
            await browser.close()
            return data
        }

        await setCookies(page, login)
        const data = await GetData(page, URL, typeRequest)
        await browser.close()
        return data
    } catch (e) {
        console.log(e)
        await browser.close()
    }
}

module.exports = {
    startParse
}
