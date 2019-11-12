import axios from 'axios'
import history from '../history'
const GET_CART = 'GET_CART'
const INCREMENT_PRODUCT = 'INCREMENT_PRODUCT'
const DECREMENT_PRODUCT = 'DECREMENT_PRODUCT'
const DELETE_PRODUCT = 'DELETE_ITEM'
const COMPLETE_ORDER = 'COMPLETE_ORDER'

const incrementProductActionCreator = product => ({
	type: INCREMENT_PRODUCT,
	product
})

const decrementProductActionCreator = product => ({
	type: DECREMENT_PRODUCT,
	product
})

const deleteProductActionCreator = product => ({
	type: DELETE_PRODUCT,
	product
})

const getCartActionCreator = cart => ({
	type: GET_CART,
	cart
})

const completeOrder = () => ({ type: COMPLETE_ORDER })

export const incrementProductThunkCreator = product => {
	return async dispatch => {
		try {
			const { data } = await axios.put('/api/cart/increment', product)
			if (data) {
				dispatch(incrementProductActionCreator(product))
			}
		} catch (error) {
			console.error(error)
		}
	}
}

export const decrementItemThunkCreator = product => {
	return async dispatch => {
		try {
			const { data } = await axios.put('/api/cart/decrement', product)
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
			const { data } = await axios.delete(`/api/cart/${product.id}`)
			if (data) {
				dispatch(deleteProductActionCreator(product))
			}
		} catch (error) {
			console.error(error)
		}
	}
}

export const getCartThunkCreator = () => {
	return async dispatch => {
		try {
			const { data } = await axios.get('/api/cart')
			if (data) {
				dispatch(getCartActionCreator(data))
			}
		} catch (error) {
			console.error(error)
		}
	}
}

export const completeOrderThunk = () => {
	return async dispatch => {
		try {
			const { data } = await axios.put('/api/cart/checkout')
			dispatch(completeOrder())
			history.push('/ordercomplete')
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
			if (Object.keys(cart).includes(product.id.toString())) {
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
			if (Object.keys(cart).includes(product.id.toString())) {
				delete newCart[product.id]
			}
			return newCart
		case GET_CART:
			return action.cart
		case COMPLETE_ORDER:
			return {}
		default:
			return cart
	}
}

export default cartReducer
