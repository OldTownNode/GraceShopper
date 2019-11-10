const router = require('express').Router()
const { Order, Product } = require('../db/models')

router.get('/', async (req, res, next) => {
	if (req.user) {
		try {
			let cartOrder = await Order.findOne({
				where: {
					userId: req.user.id,
					status: 'inCart'
				},
				include: [{ model: Product, as: 'products' }]
			})
			let returnObject = {}
			cartOrder.products.map(product => {
				returnObject[product.id] = product.orderproduct.quantity
			})
			res.json(returnObject)
		} catch (error) {
			next(error)
		}
	} else {
		//TODO handle guest case
	}
})

router.get('/order', async (req, res, next) => {
	if (req.user) {
		try {
			//TODO update
			let cartOrder = await Order.findOne({
				where: {
					userId: req.user.id,
					status: 'inCart'
				},
				include: [{ model: Product, as: 'products' }]
			})
			res.json(cartOrder)
		} catch (error) {
			next(error)
		}
	} else {
		res.json(req.session.cart)
	}
})

//This route will handle all 'additions' to the cart, even if it is just incrementing a product that is already there.  There are two cases to handle:  When the user is logged in and when the user is a guest. This will be handled by checking if req.user is undefined.

//req.body is a product
router.put('/increment', async (req, res, next) => {
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

router.put('/decrement', async (req, res, next) => {
	if (req.user) {
		try {
			let cartOrder = await Order.findOrCreate({
				where: {
					userId: req.user.id,
					status: 'inCart'
				}
			})
			res.json(
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

router.delete('/:productId', async (req, res, next) => {
	if (req.user) {
		try {
			let cartOrder = await Order.findOne({
				where: {
					userId: req.user.id,
					status: 'inCart'
				}
			})
			if (cartOrder) {
				res.send(cartOrder.removeProduct(req.params.productId))
			} else {
				res.json(undefined)
			}
		} catch (error) {
			next(error)
		}
	} else {
		//TODO handle Session version
		res.send('not logged in')
	}
})

router.put('/checkout', async (req, res, next) => {
	if (req.user) {
		try {
			let cartOrder = await Order.findOne({
				where: {
					userId: req.user.id,
					status: 'inCart'
				}
			})
			cartOrder.status = 'complete'
			await cartOrder.save()
			res.send(cartOrder)
		} catch (error) {
			next(error)
		}
	} else {
		res.send('not logged in not set up yet')
	}
})

module.exports = router
