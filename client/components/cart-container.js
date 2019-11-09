import React from 'react'
import { getCartThunkCreator } from '../store/cartReducer'
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
			<CartView cart={this.props.cart} products={this.props.products} />
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
	fetchProducts: () => dispatch(fetchProducts())
})

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(
	DisconnectedCartContainer
)

export default CartContainer
