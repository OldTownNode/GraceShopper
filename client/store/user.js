import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const FIND_SINGLE_USER = 'FIND_SINGLE_USER'
const ALL_USERS = 'ALL_USERS'
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
const findSingleUser = user => ({ type: FIND_SINGLE_USER, user })
const allUsers = users => ({ type: ALL_USERS, users })
/**
 * THUNK CREATORS
 */
//custom thunks start
export const findSingleUserThunk = user => async dispatch => {
	try {
		const { data } = await axios.get(`/api/users/${user}`)
		console.log(data)
		dispatch(findSingleUser(data[0]))
	} catch (error) {
		console.error(error)
	}
}

export const allUsersThunk = () => async dispatch => {
	try {
		const res = await axios.get('/api/users')

		dispatch(allUsers(res.data || initialState.allUsers))
	} catch (error) {
		console.error(error)
	}
}
//custom thunks end
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
			return { ...state, user: action.user }
		case REMOVE_USER:
			return { ...state, user: initialState.user }
		case FIND_SINGLE_USER:
			return { ...state, user: action.user }
		case ALL_USERS:
			return { ...state, allUsers: action.users }
		default:
			return state
	}
}
