const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: { // maybe use enum? your choice, but have a reason why
    // have some defaultValue here if you keep it like this
		type: Sequelize.STRING,
		validate: {
			isIn: [['inCart', 'complete']]
		}
	}
})

module.exports = Order
