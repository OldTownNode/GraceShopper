import axios from 'axios'

const GET_CART = 'GET_CART'
const INCREMENT_PRODUCT = 'INCREMENT_PRODUCT'
const DECREMENT_PRODUCT = 'DECREMENT_PRODUCT'
const DELETE_PRODUCT = 'DELETE_ITEM'

export const incrementProductActionCreator = product => ({
	type: INCREMENT_PRODUCT,
	product
})

export const decrementProductActionCreator = product => ({
	type: DECREMENT_PRODUCT,
	product
})

export const deleteProductActionCreator = product => ({
	type: DELETE_PRODUCT,
	product
})

export const incrementProductThunkCreator = product => {
	return async dispatch => {
		try {
			const { data } = await axios.put('/api/cart/increment', product)
			//TODO check here if post was successful
			dispatch(incrementProductActionCreator(product))
		} catch (error) {
			console.error(error)
		}
	}
}

export const decrementItemThunkCreator = product => {
	return async dispatch => {
		try {
			const { data } = await axios.put('/api/cart/decrement', product)

			console.log('data', data)
			if (data) {
				dispatch(decrementProductActionCreator(product))
			}
		} catch (error) {
			console.error(error)
		}
	}
}

export const deleteItemThunkCreator = product => {
	return async dispatch => {
		try {
			const { data } = await axios.delete('/api/cart', product)
			if (data > 0) {
				dispatch(decrementProductActionCreator(product))
			}
		} catch (error) {
			console.error(error)
		}
	}
}

// eslint-disable-next-line complexity
const cartReducer = (cart = {}, action) => {
	let product = action.product
	let newCart = { ...cart }
	switch (action.type) {
		case INCREMENT_PRODUCT:
			//if cart already has the item
			console.log('type', product.id)
			console.log('keys', Object.keys(cart))
			if (Object.keys(cart).includes(product.id.toString())) {
				console.log('we are inside')
				let currentQty = cart[product.id]
				newCart[product.id] = currentQty + 1
			} else {
				//if cart doesn't have the item yet.
				newCart[product.id] = 1
			}
			return newCart
		case DECREMENT_PRODUCT:
			if (
				Object.keys(cart).includes(product.id.toString()) &&
				cart[product.id] > 0
			) {
				let currentQty = cart[product.id]
				newCart[product.id] = currentQty - 1
			}
			if (newCart[product.id] === 0) {
				delete newCart[product.id]
			}
			return newCart
		case DELETE_PRODUCT:
			if (Object.keys(cart).includes(product.id)) {
				delete newCart[product.id]
			}
			return newCart
		default:
			return cart
	}
}

export default cartReducer
