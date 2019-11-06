const router = require('express').Router()
const { Order } = require('../db/models')
const { User } = require('../db/models')

router.get('/', async (req, res, next) => {
	const user = await User.findByPk(req.session.userId)
	if (user && user.admin) {
		try {
			const orders = await Order.findAll()
			res.json(orders)
		} catch (err) {
			next(err)
		}
	} else {
		res.sendStatus(401)
	}
})

router.get('/:id', async (req, res, next) => {
	const user = await User.findByPk(req.session.userId)
	if (user && user.admin) {
		try {
			const orders = await Order.findByPk(req.params.id)
			res.json(orders)
		} catch (err) {
			next(err)
		}
	} else if (user) {
		try {
			const orders = await Order.findAll({
				where: {
					id: req.params.id,
					userId: req.session.userId
				}
			})
			if (Object.keys(orders).length > 0) {
				res.json(orders)
			} else {
				res.sendStatus(404)
			}
		} catch (error) {
			next(error)
		}
	} else {
		res.sendStatus(401)
	}
})

// router.post()

// router.put()

module.exports = router
