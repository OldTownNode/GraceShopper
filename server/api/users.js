const router = require('express').Router()
const { User } = require('../db/models')
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
							'country'
						]
					})
					res.json(users)
				} catch (err) {
					next(err)
				}
			} else {
				console.error('Insufficient Rights')
			}
		})
	} catch (error) {
		next(error)
	}
})

router.put('/:id', async (req, res, next) => {
	try {
		User.findByPk(req.session.userId).then(async user => {
			if (!user || !user.admin || user.id !== req.session.userId)
				console.error('Insufficient Rights')
			else {
				try {
					const users = await User.update({
						email: req.body.email,
						password: req.body.password,
						username: req.body.username,
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						apt: req.body.apt,
						street: req.body.street,
						houseNumber: req.body.houseNumber,
						zipcode: req.body.zipcode,
						state: req.body.state
					})
					if (user.admin) {
						await User.update({
							admin: req.admin
						})
					}
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
