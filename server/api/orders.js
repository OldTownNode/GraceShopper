const router = require('express').Router()
const { Order } = require('../db/models')
const { User } = require('../db/models')
const { Product } = require('../db/models')

router.get('/', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.session.userId)
		if (user && user.admin) {
			const orders = await Order.findAll()
			res.json(orders)
		} else {
			res.sendStatus(401)
		}
	} catch (err) {
		next(err)
	}
})

router.get('/:id', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.session.userId)
		if (user && user.admin) {
			const orders = await Order.findByPk(req.params.id)
			res.json(orders)
		} else if (user) {
			const orders = await Order.findOne({
				where: {
					id: req.params.id,
					userId: req.session.userId
				},
				include: [{ model: Product, as: 'products' }]
			})
			if (Object.keys(orders).length > 0) {
				res.json(orders)
			}
		} else {
			res.sendStatus(404)
		}
	} catch (error) {
		next(error)
	}
})

module.exports = router
