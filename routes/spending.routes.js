const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth.middleware')
const Spending = require('../models/Spending')
const Category = require('../models/Category')

const router = Router()

//api/spending
router.get('/', auth,  async (req, res) => {
    try {
        const spendings = await Spending.getAllByUserId({userId:req.user.userId})
        res.json(spendings)
    } catch (e) {
        res.status(500).json({message:'Не вдалось отримати витрати з сервера'})
    }
})

// api/spending/create
router.post(
    '/create',
    [	
		check('amount', "Введіть, будь-ласка, суму")
			.notEmpty(),
		check('category', 'Введіть, будь-ласка, категорію')
            .notEmpty(),
	],
    async (req, res) => {
        try {
            const errors = validationResult(req)
			if ( !errors.isEmpty() ) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Невірні дані витрати!'
				})
			}

            let {category, amount, date, userId} = req.body
            category = category.trim().toLowerCase()
            category = category[0].toUpperCase() + category.substring(1)
            let isExitCategory = await Category.findOne(category, userId)
            if (!isExitCategory) {
                const newCategory = new Category({name:category, userId})
                isExitCategory =  await newCategory.save()
            }
          
            const spending = new Spending({category:isExitCategory.name, amount, date, userId})
            const newSpending = await spending.save()
            res.status(201).json({message: `Витрата успішно створена.`, newSpending})
        } catch(e) {
            res.status(500).json({message:'Помилка при додаванні витрати'})
        }
    }
)
// api/spending/update/:id
router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updatedSpending = await Spending.update({...req.body, id:id})
        res.status(201).json(updatedSpending)
    } catch (e) {
        res.status(500).json({message: 'Не вийшло змінити витрату, спробуйте ще'})
    }
})
// api/spending/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedSpending = await Spending.delete({id})
        res.status(201).json(deletedSpending)
    } catch (e) {
        res.status(500).json({message: 'Не вийшло видалити витрату, спробуйте ще'})
    }
})

module.exports = router