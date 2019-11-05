import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const SINGLE_USER = 'SINGLE_USER'
/**
 * INITIAL STATE
 */
const initialState = {
	allUsers: [],
	user: {}
}

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const singleUser = user => ({ type: SINGLE_USER, user })
/**
 * THUNK CREATORS
 */

// export const userView = user => async dispatch => {
// 	try {
// 		const res = await axios.get(`/api/users/${user.id}`)
// 		dispatch(singleUser(res))
// 	} catch (error) {
// 		console.error(error)
// 	}
// }
//boilermaker original login functions//
export const me = () => async dispatch => {
	try {
		const res = await axios.get('/auth/me')
		dispatch(getUser(res.data || initialState.user))
	} catch (err) {
		console.error(err)
	}
}

export const auth = (email, password, method) => async dispatch => {
	let res
	try {
		console.log(email, password)
		res = await axios.post(`/auth/${method}`, { email, password })
	} catch (authError) {
		return dispatch(getUser({ error: authError }))
	}

	try {
		dispatch(getUser(res.data))
		history.push('/home')
	} catch (dispatchOrHistoryErr) {
		console.error(dispatchOrHistoryErr)
	}
}

export const logout = () => async dispatch => {
	try {
		await axios.post('/auth/logout')
		dispatch(removeUser())
		history.push('/login')
	} catch (err) {
		console.error(err)
	}
}
//end boilermaker original login functions//
/**
 * REDUCER
 */
export default function(state = initialState, action) {
	switch (action.type) {
		case GET_USER:
			initialState.user = action.user
			return initialState.user
		case REMOVE_USER:
			return initialState.user
		case SINGLE_USER:
			initialState.user = action.user
			return initialState.user
		default:
			return state
	}
}
