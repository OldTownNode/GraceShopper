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

module.exports = router
