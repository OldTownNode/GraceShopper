import Axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'
// const REMOVE_USER = 'REMOVE_USER'

/**
 * ACTION CREATORS
 */
const gotAllOrders = orders => ({ type: GOT_ALL_ORDERS, orders })
// const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const getAllOrders = () => async dispatch => {
	const { data } = await Axios.get('/api/orders')
	console.log(data)
	dispatch(gotAllOrders(data))
}

/**
 * INITIAL STATE
 */
// const initialState = {
//     orders: [],
//     singleOrder: {}
// }

/**
 * REDUCER
 */
export default function(orders = [], action) {
	switch (action.type) {
		case GOT_ALL_ORDERS:
			return action.orders
		default:
			return orders
	}
}
