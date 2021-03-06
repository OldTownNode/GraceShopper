const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
	name: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			notEmpty: true
		}
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: false,
		notEmpty: true
	},
	imageUrl: {
		type: Sequelize.TEXT,
		defaultValue:
			'https://imgprod65.hobbylobby.com/6/92/56/69256be24e88d103aec27b1678b712d26f870d18/350Wx350H-390039-1118.jpg'
	},
	inventory: {
		type: Sequelize.INTEGER,
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
	},
	category: {
		type: Sequelize.STRING,
		validate: {
			isIn: [
				[
					'apparel',
					'horses',
					'equipment',
					'weapons',
					'entertainment',
					'miscellaneous'
				]
			]
		}
	}
})

module.exports = Product
