const puppeteer = require('puppeteer')
require('dotenv').config()
const settings = require('../utils/http.settings')
const setCookies = require('./setCookies')

async function serviceHttpCoordinates (id, login) {
        const browser = await puppeteer.launch(settings)
        const page = await browser.newPage()
        try {
            await setCookies(page, login)
            await page.goto(process.env.BASE_URL +  process.env.URL_ITEM + id)
            await page.content()
            const addressBuilding = await page.evaluate(() => {
                return document.querySelector("[href*='?core_section=address_building&action=show&id']")?.href
            })
            console.log('addressBuilding: ', addressBuilding)
            await page.goto(addressBuilding)
            const coordinates = await page.evaluate(() => {
                return document.querySelector("[href*='?core_section=map&action=show&opt_wh']")?.innerText || ''
            })
            console.log('coordinates: ', coordinates)
            await browser.close()
            return coordinates
                // coordinateOne: +coordinates?.toString()?.split(',')[0],
                // coordinateTwo: +coordinates?.toString()?.split(',')[1],

        } catch (e) {
            console.log(e)
        }
    }

module.exports = serviceHttpCoordinates
