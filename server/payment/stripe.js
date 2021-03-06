const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const uuid = require('uuid/v4')

router.post('/', async (req, res) => {
	let error
	let status
	try {
		const { price, token } = req.body

		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id
		})

		const idempotency_key = uuid()
		const charge = await stripe.charges.create(
			{
				amount: price * 100,
				currency: 'usd',
				customer: customer.id,
				receipt_email: token.email,
				shipping: {
					name: token.card.name,
					address: {
						line1: token.card.address_line1,
						line2: token.card.address_line2,
						city: token.card.address_city,
						country: token.card.address_country,
						postal_code: token.card.address_zip
					}
				}
			},
			{
				idempotency_key
			}
		)

		status = 'success'
	} catch (error) {
		console.error('Error:', error)
		status = 'failure'
	}

	res.json({ error, status })
})

module.exports = router
