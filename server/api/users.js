/* eslint-disable complexity */
const router = require('express').Router()
const { User, Order } = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.user.id)

		if (!user || !user.admin) console.error('Insufficient Rights')
		else {
			const users = await User.findAll({
				attributes: [
					'id',
					'email',
					'address',
					'username',
					'firstName',
					'lastName'
				]
			})
			res.json(users)
		}
	} catch (error) {
		next(error)
	}
})

router.get('/:id', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.user.id)
		if (user.id === parseInt(req.params.id) || user.admin) {
			const users = await User.findAll({
				where: {
					id: req.params.id
				},
				attributes: [
					'id',
					'email',
					'address',
					'username',
					'firstName',
					'lastName',
					'apt',
					'houseNumber',
					'street',
					'zipcode',
					'state',
					'country',
					'admin'
				]
			})
			res.json(users)
		} else {
			res.status(401).send('Insufficient Rights')
		}
	} catch (error) {
		next(error)
	}
})

router.get('/:id/orders', async (req, res, next) => {
	try {
		if (
			(req.user && req.user.id === parseInt(req.params.id)) ||
			req.user.admin
		) {
			const userOrders = await Order.findAll({
				where: {
					userId: req.params.id
				}
			})
			res.send(userOrders)
		} else {
			res.sendStatus(401)
		}
	} catch (error) {
		next(error)
	}
})

router.put('/:id', async (req, res, next) => {
	try {
		if (req.params.id !== '0') {
			const user = await User.findByPk(req.user.id)
			if (user.id === parseInt(req.params.id) || user.admin) {
				await User.update(
					{
						email: req.body.email,
						password: req.body.password,
						username: req.body.username,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						apt: req.body.apt,
						street: req.body.street,
						houseNumber: req.body.houseNumber,
						zipcode: req.body.zipcode,
						state: req.body.state,
						country: req.body.country
					},

					{
						where: { id: req.params.id },
						individualHooks: true
					}
				)

				if (user.admin && !(user.id === parseInt(req.params.id))) {
					await User.update(
						{
							email: req.body.email,
							password: req.body.password,
							username: req.body.username,
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							apt: req.body.apt,
							street: req.body.street,
							houseNumber: req.body.houseNumber,
							zipcode: req.body.zipcode,
							state: req.body.state,
							country: req.body.country
						},

						{
							where: { id: req.params.id },
							individualHooks: true
						}
					)

					res.json(user)
				} else {
					res.status(401).send('Insufficient Rights')
				}
			} else {
				res.sendStatus(201)
			}
		}
	} catch (error) {
		res.status(401).send(error.message)
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.user.id)
		if (user.id === parseInt(req.params.id) || user.admin) {
			const destroyed = await User.destroy({
				where: { id: parseInt(req.params.id) }
			})
			res.json(destroyed)
		} else {
			res.status(401).send('Insufficient Rights')
		}
	} catch (error) {
		next(error)
	}
})
