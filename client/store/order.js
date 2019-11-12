import Axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'
const GOT_USER_ORDERS = 'GOT_USER_ORDERS'

/**
 * ACTION CREATORS
 */
const gotAllOrders = orders => ({ type: GOT_ALL_ORDERS, orders })
const gotUserOrders = userOrders => ({ type: GOT_USER_ORDERS, userOrders })

/**
 * THUNK CREATORS
 */
export const getAllOrders = () => async dispatch => {
	try {
		const { data } = await Axios.get('/api/orders')
		dispatch(gotAllOrders(data))
	} catch (error) {
		console.log(error)
	}
}

export const getUserOrders = id => async dispatch => {
	try {
		const { data } = await Axios.get(`/api/users/${id}/orders`)
		dispatch(gotUserOrders(data))
	} catch (error) {
		console.log(error)
	}
}

/**
 * REDUCER
 */
export default function(orders = [], action) {
	switch (action.type) {
		case GOT_ALL_ORDERS:
			return action.orders
		case GOT_USER_ORDERS:
			return action.userOrders
		default:
			return orders
	}
}
