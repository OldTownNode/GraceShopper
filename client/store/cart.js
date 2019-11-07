import axios from 'axios'

const ADD_ITEM = 'ADD_ITEM'

export const addItemActionCreator = product => ({
	type: ADD_ITEM,
	product
})

const cartReducer = (cart = {}, action) => {
	switch (action.type) {
		default:
			return cart
	}
}
