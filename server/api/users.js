const router = require('express').Router()
const { User, Order } = require('../db/models')
const uuid = require('uuid/v4')

module.exports = router

// router.param('id', async (req, res, next, id) => {
//   User.findByPk(id)
//     .then((user) => {
//       console.log(user)
//       if (!user) console.error('No such user')
//       req.requestedUser = user
//       next()
//       return null
//     })
//     .catch(next)
// })

router.get('/', async (req, res, next) => {
	try {
		User.findByPk(req.session.userId).then(async user => {
			if (!user || !user.admin) console.error('Insufficient Rights')
			else {
				try {
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
				} catch (err) {
					next(err)
				}
			}
		})
	} catch (error) {
		next(error)
	}
})

router.get('/:id', async (req, res, next) => {
	try {
		User.findByPk(req.session.userId).then(async user => {
			if (user.id === parseInt(req.params.id) || user.admin) {
				try {
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
				} catch (err) {
					next(err)
				}
			} else {
				res.status(401).send('Insufficient Rights')
			}
		})
	} catch (error) {
		next(error)
	}
})

router.get('/:id/orders', async (req, res, next) => {
	if (req.user && req.user.admin) {
		try {
			const userOrders = await Order.findAll({
				where: {
					userId: req.params.id
				}
			})
			res.send(userOrders)
		} catch (error) {
			next(error)
		}
	} else if (req.user && req.user.id === parseInt(req.params.id)) {
		try {
			const userOrders = await Order.findAll({
				where: {
					userId: req.params.id
				}
			})
			res.send(userOrders)
		} catch (error) {
			next(error)
		}
	} else {
		res.sendStatus(401)
	}
})

router.put('/:id', async (req, res, next) => {
	if (req.params.id !== '0') {
		try {
			const user = await User.findByPk(req.session.userId)
			if (user.id === parseInt(req.params.id) || user.admin) {
				try {
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
								admin: req.body.admin
							},
							{
								where: { id: req.params.id }
							}
						)
					}

					res.json(user)
				} catch (err) {
					res.status(401).send(err.message)
				}
			} else {
				res.status(401).send('Insufficient Rights')
			}
		} catch (error) {
			next(error)
		}
	} else {
		try {
			const user = await User.create({
				email:
					uuid().substring(0, req.body.email.length) + req.body.email,
				password: 'Guest' + uuid().substring(0, 9) + '@',
				//username: 'Guest'+Math.floor(Math.random()*10),
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				apt: req.body.apt,
				street: req.body.street,
				houseNumber: req.body.houseNumber,
				zipcode: req.body.zipcode,
				state: req.body.state,
				country: req.body.country,
				isGuest: true
			})
			res.sendStatus(201)
		} catch (error) {
			res.status(401).send(error.message)
		}
	}
})

router.delete('/:id', async (req, res, next) => {
	try {
		const user = await User.findByPk(req.session.userId)
		if (user.id === parseInt(req.params.id) || user.admin) {
			try {
				const destroyed = await User.destroy({
					where: { id: parseInt(req.params.id) }
				})
				res.json(destroyed)
			} catch (err) {
				next(err)
			}
		} else {
			res.status(401).send('Insufficient Rights')
		}
	} catch (error) {
		next(error)
	}
})
