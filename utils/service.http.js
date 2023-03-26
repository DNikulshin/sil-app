const { promises: fs } = require('fs')
const path = require('path')
require('dotenv').config()

const Auth = async (page, login = '', password = '') => {
    try {
        await page.goto(process.env.BASE_URL)
        await page.click('input[name="username"]')
        await page.type('input[name="username"]', login)
        await page.click('input[name="password"]')
        await page.type('input[name="password"]', password)
        await page.click('input[type="submit"]')
        const cookies = await page.cookies()
        await fs.writeFile(path.resolve(__dirname, '..', 'cookies', `cookie-${login}.json`), JSON.stringify(cookies, null, 2))
    } catch (e) {
        console.log(e)
    }

}


// const readCookies = async (page, login) => {
//     const cookiesString = await fs.readFile(path.resolve(__dirname, '..', 'cookies', `cookie-${login}.json`))
//     const setCookies = JSON.parse(cookiesString.toString())
//     await page.setCookie(...setCookies)
// }

const GetData = async (page, URL, typeRequest) => {
    await page.goto(URL)
    if (typeRequest === 'me-claim') {
        await page.content()
        await page.goto(await page.$eval('#linkTaskList996Id', (el) => el?.href))
    }

    return await page.evaluate(() => {
        const regExpSortTel = /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/g
        const results = Array.from(document.querySelectorAll('.table_item'))
        return results.map(item => {
            return {
                itemId: item.querySelector('td:nth-child(2)')?.innerText ?? null,
                type: item.querySelector('td:nth-child(3)')?.innerText ?? null,
                createDate: item.querySelector('td:nth-child(4)')?.innerText ?? null,
                setDate: item.querySelector('td:nth-child(5)')?.innerText ?? null,
                address: item.querySelector('td:nth-child(6)')?.innerText ?? null,
                itemObject: item.querySelector('td:nth-child(7)')?.innerText ?? null,
                description: item.querySelector('td:nth-child(8)')?.innerText ?? null,
                phoneNumber: (item.querySelector('td:nth-child(7)')?.innerText).match(regExpSortTel) ?? null,
                phoneNumberDescription: (item.querySelector('td:nth-child(8)')?.innerText).match(regExpSortTel) ?? null,
                comments: item.querySelector('td:nth-child(9)')?.innerText ?? null,
                labels: (item.querySelector('td:nth-child(10)')?.innerText) ?? null,
                executors: item.querySelector('td:nth-child(11)')?.innerText ?? null
            }
        })
    })
}

module.exports = {
    Auth, GetData
}



