const { Router } = require('express')
// const { startParse } = require('../utils/puppeteer')
// const getDetails = require('../utils/service.httpGetDetails')
// const getCoordinates = require('../utils/service.httpGetCoordinates')
// const clearCookies = require('../utils/service.httpClearCookies')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')

const router = Router()

router.post(
    '/register',
    [
        check('login', 'Логин не может быть пустым').exists(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            console.log(req.body)
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }

            const { login, password } = req.body

            const candidate = await User.findOne({ login })

            if (candidate) {
                return res.status(400).json({ message: 'Пользователь уже существует' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = new User({ login, password: hashedPassword })

            await user.save()

            res.status(201).json({ message: 'Пользователь создан' })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

router.post(
    '/login',
    [
        check('login', 'Введите логин').exists(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res, next) => {

    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const { login, password } = req.body

        const user = await User.findOne({login})

        if(!user) {
            return res.status(400).json({message: 'Пользователь не найден'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({message: 'Неверный логин или пароль'})
        }

        const token = jwt.sign(
            {userId: user.id},
           process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.id})
        next()

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})


module.exports = router

