const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
	status: {
		type: Sequelize.STRING,
		validate: {
			isIn: [['inCart', 'complete']]
		}
	}
})

module.exports = Order
