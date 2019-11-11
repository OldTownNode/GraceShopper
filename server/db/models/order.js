const Sequelize = require('sequelize')
const db = require('../db')
const OrderProduct = require('./orderProduct')

const Order = db.define('order', {
	status: {
		type: Sequelize.STRING,
		defaultValue: 'inCart',
		validate: {
			isIn: [['inCart', 'complete']]
		}
	}
})

Order.prototype.incrementProduct = async function(productId, price) {
	try {
		let orderProduct = await OrderProduct.findOrCreate({
			where: {
				orderId: this.id,
				productId: productId
			},
			defaults: {
				price: price
			}
		})
		let newQuantity = orderProduct[0].quantity + 1
		orderProduct[0].quantity = newQuantity
		await orderProduct[0].save()
		return orderProduct[0]
	} catch (error) {
		console.error(error)
	}
}

Order.prototype.decrementProduct = async function(productId, price) {
	try {
		let orderProduct = await OrderProduct.findOne({
			where: {
				orderId: this.id,
				productId: productId
			}
		})
		if (orderProduct && orderProduct.quantity) {
			let newQuantity = orderProduct.quantity - 1
			if (newQuantity) {
				orderProduct.quantity = newQuantity
				orderProduct.price = price
				await orderProduct.save()
			} else {
				await orderProduct.destroy()
			}
			return orderProduct
		}
	} catch (error) {
		console.error(error)
	}
}

Order.prototype.removeProduct = async function(productId) {
	try {
		let orderProduct = await OrderProduct.findOne({
			where: {
				orderId: this.id,
				productId: productId
			}
		})
		if (orderProduct) {
			return await orderProduct.destroy()
		}
	} catch (error) {
		console.error(error)
	}
}

module.exports = Order
