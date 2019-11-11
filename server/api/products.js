const router = require('express').Router()
const { Product } = require('../db/models/index')

router.get('/', async (req, res, next) => {
	try {
		const products = await Product.findAll()
		res.json(products)
	} catch (error) {
		console.log('error in get all products route', error)
		next(error)
	}
})

router.get('/:id', async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.id)
		res.json(product)
	} catch (error) {
		console.log('error in get single products route', error)
	}
})

// eslint-disable-next-line complexity
router.put('/:id', async (req, res, next) => {
	try {
		if (req.user.admin === true) {
			let productObj = {}
			const product = await Product.findByPk(req.params.id)
			console.log('prod before update', product)
			if (req.body.name !== '') {
				productObj.name = req.body.name
			} else {
				productObj.name = product.name
			}
			if (req.body.description !== '') {
				productObj.description = req.body.description
			} else {
				productObj.description = product.description
			}

			if (req.body.imageUrl !== '') {
				productObj.imageUrl = req.body.imageUrl
			} else {
				productObj.imageUrl = product.imageUrl
			}

			if (req.body.inventory !== '') {
				productObj.inventory = +req.body.inventory
			} else {
				productObj.inventory = +product.inventory
			}
			if (req.body.price !== '') {
				productObj.price = +req.body.price
			} else {
				productObj.price = parseFloat(product.price)
			}
			if (req.body.category !== '') {
				productObj.category = req.body.category
			} else {
				productObj.category = product.category
			}
			await product.update(productObj)
			await product.save()
			res.json(product)
		} else {
			res.send('only admins are able to update products')
		}
	} catch (error) {
		next(error)
	}
})

module.exports = router
