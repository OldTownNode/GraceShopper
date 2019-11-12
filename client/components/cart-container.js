import React from 'react'
import {
	getCartThunkCreator,
	incrementProductThunkCreator,
	decrementItemThunkCreator,
	deleteItemThunkCreator
} from '../store/cartReducer'
import { fetchProducts } from '../store/product'
import { connect } from 'react-redux'
import CartView from './cart-view'

class DisconnectedCartContainer extends React.Component {
	componentDidMount() {
		if (this.props.products.length === 0) {
			this.props.fetchProducts()
		}
		this.props.getCart()
	}

	render() {
		return (
			<div className="container">
				<CartView
					cart={this.props.cart}
					products={this.props.products}
					increment={this.props.increment}
					decrement={this.props.decrement}
					delete={this.props.delete}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		cart: state.cart,
		products: state.productReducer.products
	}
}

const mapDispatchToProps = dispatch => ({
	getCart: () => dispatch(getCartThunkCreator()),
	fetchProducts: () => dispatch(fetchProducts()),
	increment: product => dispatch(incrementProductThunkCreator(product)),
	decrement: product => dispatch(decrementItemThunkCreator(product)),
	delete: product => dispatch(deleteItemThunkCreator(product))
})

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(
	DisconnectedCartContainer
)

export default CartContainer
