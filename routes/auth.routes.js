const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config');

const User = require('../models/User.js')

const router = Router()

// /api/auth/register
router.post(
	'/register',
	[	
		check('name', "Введіть, будь-ласка, ім'я")
			.notEmpty(),
		check('email', 'Некоректний email').isEmail(),
		check('password', 'Мінімальна довжина пароля 5 символів')
			.isLength({min: 5})
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if ( !errors.isEmpty() ) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Невірні дані для регістрації!'
				})
			}

			const {name, email, password} = req.body
			const candidate = await User.findOne(email)
			 
			if (candidate) {
				return res.status(400).json({message: 'Користувач з таким емейлом вже існує!'})
			}

			const hashedPassword = await bcrypt.hash(password, 12)
			const user = new User({name, email, hashedPassword})
			await user.save()

			res.status(201).json({message: 'Користувач успішно створений'})

		} catch(e) {
			res.status(500).json({message:'Помилка при реєстрації'})
		}

	})

// /api/auth/login
router.post(
	'/login',
	[	
		check('email', 'Некоректний email').isEmail(),
		check('password', 'Введіть пароль')
			.exists()
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if ( !errors.isEmpty() ) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Невірні дані при авторизації!'
				})
			}

			const {email, password} = req.body
			const user = await User.findOne(email)

			if (!user) {
				return res.status(400).json({message: 'Такого користувача не існує, зареєструйтесь, будь-ласка!'})
			}

			const isMatch = await bcrypt.compare(password, user.password)
			if (!isMatch) {
				return res.status(400).json({message: 'Невірний пароль,спробуйте ще!'})
			}
			const token = jwt.sign(
					{userId: user.id},
					config.get('jwtSecret'),
					{expiresIn: '2h'}
				)

			res.json({token, userId: user.id, userName: user.name})

		} catch(e) {
			res.status(500).json({message:'Помилка при авторизації'})
		}


})


module.exports = router