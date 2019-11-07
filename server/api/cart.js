const router = require('express').Router()
const { Order } = require('../db/models')

router.get('/', (req, res, next) => {
	try {
		res.json(req.session.cart)
	} catch (error) {
		next(error)
	}
})

//This route will handle all 'additions' to the cart, even if it is just incrementing a product that is already there.  There are two cases to handle:  When the user is logged in and when the user is a guest. This will be handled by checking if req.user is undefined.

//req.body is a product
router.post('/', async (req, res, next) => {
	if (req.user) {
		try {
			let cartOrder = await Order.findOrCreate({
				where: {
					userId: req.user.id,
					status: 'inCart'
				}
			})
			res.json(
				await cartOrder[0].incrementProduct(req.body.id, req.body.price)
			)
		} catch (error) {
			next(error)
		}
	} else {
		//TODO handle Session version
		res.send('not logged in')
	}
})

router.put('/', async (req, res, next) => {
	if (req.user) {
		try {
			let cartOrder = await Order.findOrCreate({
				where: {
					userId: req.user.id,
					status: 'inCart'
				}
			})
			res.send(
				await cartOrder[0].decrementProduct(req.body.id, req.body.price)
			)
		} catch (error) {
			next(error)
		}
	} else {
		//TODO handle Session version
		res.send('not logged in')
	}
})

router.delete('/', async (req, res, next) => {
	if (req.user) {
		try {
			let cartOrder = await Order.findOne({
				where: {
					userId: req.user.id,
					status: 'inCart'
				}
			})
			console.log(cartOrder)
			if (cartOrder) {
				res.send(cartOrder.removeProduct(req.body.id))
			} else {
				res.send({})
			}
		} catch (error) {
			next(error)
		}
	} else {
		//TODO handle Session version
		res.send('not logged in')
	}
})

module.exports = router
