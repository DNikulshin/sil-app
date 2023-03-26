const puppeteer = require('puppeteer')
const { promises: fs } = require('fs')
const path = require('path')
require('dotenv').config()
const settings = require('../utils/http.settings')
const setCookies =require('./setCookies')
async function serviceHttpGetDetails (id,  login) {
        const browser = await puppeteer.launch(settings)
        const page = await browser.newPage()
        try {
            await setCookies(page, login)
            await page.goto(process.env.BASE_URL + process.env.URL_ITEM + id)
            await page.content()
            const detail = await page.evaluate(() => {
              const result =  Array.from(document.querySelectorAll('.j_card_div'))
                return result.map(el => el?.innerText)
            })
            await browser.close()
            return detail
        } catch (e) {
            console.log(e)
            await browser.close()
        }
    }

module.exports = serviceHttpGetDetails
