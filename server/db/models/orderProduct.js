const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderproduct', {
	quantity: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
		validate: {
			min: 0
		}
	},
	price: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			min: 0,
			notEmpty: true
		}
	}
})

module.exports = OrderProduct
