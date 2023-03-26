const { promises: fs } = require('fs')
const path = require('path')

async function setCookies (page, login) {
    const cookiesString = await fs.readFile(path.resolve(__dirname, '..', 'cookies', `cookie-${login}.json`))
    const setCookies = JSON.parse(cookiesString.toString())
    await page.setCookie(...setCookies)
}

module.exports = setCookies
