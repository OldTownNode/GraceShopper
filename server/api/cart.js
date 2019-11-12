const router = require('express').Router()
const { Order, Product } = require('../db/models')

router.get('/', async (req, res, next) => {
	try {
		if (req.user) {
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
		} else {
			res.json(req.session.cart)
		}
	} catch (error) {
		next(error)
	}
})

router.get('/order', async (req, res, next) => {
	try {
		if (req.user) {
			let cartOrder = await Order.findOne({
				where: {
					userId: req.user.id,
					status: 'inCart'
				},
				include: [{ model: Product, as: 'products' }]
			})

			res.json(cartOrder)
		} else {
			//here is where we handle the non-logged in cart. It should return a similar object to the logged in route!
			let returnObject = {
				products: []
			}
			let products = await Product.findAll()
			returnObject.products = Object.keys(req.session.cart).map(id => {
				let productObject = products.filter(product => {
					return id === product.id.toString()
				})[0]
				let newProduct = { ...productObject.dataValues }
				newProduct.orderproduct = { quantity: 0 }
				newProduct.orderproduct.quantity = req.session.cart[id]
				return newProduct
			})

			res.json(returnObject)
		}
	} catch (error) {
		next(error)
	}
})

//This route will handle all 'additions' to the cart, even if it is just incrementing a product that is already there.  There are two cases to handle:  When the user is logged in and when the user is a guest. This will be handled by checking if req.user is undefined.
//req.body is a product
router.put('/increment', async (req, res, next) => {
	console.log('req.user', req.user)
	try {
		if (req.user) {
			let cartOrder = await Order.findOrCreate({
				where: {
					userId: req.user.id,
					status: 'inCart'
				}
			})
			res.json(
				await cartOrder[0].incrementProduct(req.body.id, req.body.price)
			)
		} else {
			if (
				Object.keys(req.session.cart).includes(req.body.id.toString())
			) {
				req.session.cart[req.body.id] =
					req.session.cart[req.body.id] + 1
			} else {
				req.session.cart[req.body.id] = 1
			}
			res.json(req.session)
		}
	} catch (error) {
		next(error)
	}
})

router.put('/decrement', async (req, res, next) => {
	try {
		if (req.user) {
			let cartOrder = await Order.findOrCreate({
				where: {
					userId: req.user.id,
					status: 'inCart'
				}
			})
			res.json(
				await cartOrder[0].decrementProduct(req.body.id, req.body.price)
			)
		} else {
			if (
				Object.keys(req.session.cart).includes(req.body.id.toString())
			) {
				req.session.cart[req.body.id] =
					req.session.cart[req.body.id] + 1
			} else {
				req.session.cart[req.body.id] = 1
			}
			res.json(req.session)
		}
	} catch (error) {
		next(error)
	}
})

router.delete('/:productId', async (req, res, next) => {
	try {
		if (req.user) {
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
		} else {
			if (Object.keys(req.session.cart).includes(req.params.productId)) {
				let newCart = { ...req.session.cart }
				delete newCart[req.body.id]
				req.session.cart = newCart
			}
			res.json(req.session)
		}
	} catch (error) {
		next(error)
	}
})

router.put('/checkout', async (req, res, next) => {
	try {
		if (req.user) {
			let cartOrder = await Order.findOne({
				where: {
					userId: req.user.id,
					status: 'inCart'
				}
			})
			cartOrder.status = 'complete'
			await cartOrder.save()
			res.send(cartOrder)
		} else {
			res.send('not logged in not set up yet')
		}
	} catch (error) {
		next(error)
	}
})

module.exports = router
