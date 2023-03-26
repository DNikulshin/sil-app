require('dotenv').config()
const { Router } = require('express')
const { startParse } = require('../utils/puppeteer')
const getDetails = require('../utils/service.httpGetDetails')
const getCoordinates = require('../utils/service.httpGetCoordinates')
const clearCookies = require('../utils/service.httpClearCookies')

const router = Router()

const currentDate = new Date().toLocaleDateString().toString()
const URL_FILTERED_DATE = process.env.URL_FILTER_DATE1 + currentDate + process.env.URL_FILTER_DATE2 + currentDate + process.env.URL_FILTER_DATE3


router.post('/me', async (req, res) => {
    try {
        const { login, stringData } = req.body
        const encodedPassword = Buffer.from(stringData, 'base64').toString('utf8')
        const data = await startParse(process.env.BASE_URL + process.env.MY_TASK, login, encodedPassword ,'me-claim')
        res.json(data)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/all', async (req, res) => {
    try {
        const { login , dateClaims = 3 } = req.body
        const data = await startParse(process.env.BASE_URL + process.env.URL_ALL_CLAIMS_LINK_ONE + dateClaims +  process.env.URL_ALL_CLAIMS_LINK_TWO, login, 'all-claim')
        res.json(data)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/coordinates/:id', async (req, res) => {
    try {
        const { login } = req.body
        const coordinates = await getCoordinates(req.params.id,  login)
        res.json(coordinates)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.post('/detail/:id', async (req, res) => {
    try {
        const { login } = req.body
        const detail = await getDetails(req.params.id,  login)
        res.json(detail)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.post('/clear-cookies', async (req, res) => {
    try {
        const { login } = req.body
        const clear_cookies = await clearCookies(login)
        res.json(clear_cookies)

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router

