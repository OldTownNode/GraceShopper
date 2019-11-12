import axios from 'axios'

const initialState = {
	products: [],
	singleProduct: {}
}

//action types
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

//action creators
export const getProducts = products => ({
	type: GET_PRODUCTS,
	products
})

export const getSingleProduct = product => ({
	type: GET_SINGLE_PRODUCT,
	singleProduct: product
})

export const getUpdatedProduct = product => ({
	type: UPDATE_PRODUCT,
	singleProduct: product
})

//thunks
export function fetchProducts() {
	return async function thunk(dispatch) {
		try {
			const { data } = await axios.get('/api/products')

			dispatch(getProducts(data))
		} catch (error) {
			console.log('error in fetch products thunk', error)
		}
	}
}

export function fetchAProduct(id) {
	return async function thunk(dispatch) {
		try {
			const { data } = await axios.get(`/api/products/${id}`)
			dispatch(getSingleProduct(data))
		} catch (error) {
			console.log('error in fetch a product thunk', error)
		}
	}
}

export function putProduct(state, id) {
	return async function thunk(dispatch) {
		try {
			console.log('id', id)
			const { data } = await axios.put(`/api/products/${id}`, state)
			dispatch(getUpdatedProduct(data))
		} catch (error) {
			console.log('error in put product thunk', error)
		}
	}
}

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PRODUCTS:
			return { ...state, products: action.products }
		case GET_SINGLE_PRODUCT:
			return { ...state, singleProduct: action.singleProduct }
		case UPDATE_PRODUCT:
			return {
				...state,
				singleProduct: action.singleProduct
			}

		default:
			return state
	}
}

export default productReducer
