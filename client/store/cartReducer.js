import axios from 'axios'

const INCREMENT_PRODUCT = 'INCREMENT_PRODUCT'
const DECREMENT_PRODUCT = 'DECREMENT_PRODUCT'
const DELETE_PRODUCT = 'DELETE_ITEM'

export const incrementProductActionCreator = product => ({
	type: ADD_ITEM,
	product
})

export const decrementProductActionCreator = product => ({
	type: SUBTRACT_ITEM,
	product
})

export const deleteProductActionCreator = product => ({
	type: DELETE_ITEM,
	product
})

export const addItemThunkCreator = product => {
	return async dispatch => {
		try {
			const { data } = await axios.post('/api/cart', product)
			//TODO check here if post was successful
			dispatch(incrementProductActionCreator(product))
		} catch (error) {
			console.error(error)
		}
	}
}

export const subtractItemThunkCreator = product => {
	return async dispatch => {
		try {
			const { data } = await axios.put('/api/cart', product)
			if (data > 0) {
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

const cartReducer = (cart = {}, action) => {
	let product = action.product
	let newCart = { ...cart }
	switch (action.type) {
		case INCREMENT_PRODUCT:
			//if cart already has the item
			if (Object.keys(cart).includes(product.id)) {
				let currentQty = cart[product.id]
				newCart[product.id] = currentQty + 1
			} else {
				//if cart doesn't have the item yet.
				newCart[product.id] = 1
			}
			return newCart
		case DECREMENT_PRODUCT:
			if (
				Object.keys(cart).includes(product.id) &&
				cart[product.id] > 0
			) {
				let currentQty = cart[product.id]
				newCart[product.id] = currentQty - 1
			}
			return newCart
		case DELETE_PRODUCT:

		default:
			return cart
	}
}

export default cartReducer
